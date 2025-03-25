require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
require("./Models/db"); // Ensure your database connection is set up properly

const app = express();
const authRoutes = require("./Routes/authRouter");
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ✅ Google OAuth Strategy - Only Getting Username
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = { username: profile.displayName }; // Only store username
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
      return done(null, { username: profile.displayName, token });
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use("/auth", authRoutes);

// 🔹 Google Authentication Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] }) // Only requesting profile (no email)
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const token = req.user.token;
    res.redirect(`http://localhost:5173/login?token=${token}`); // Redirect to frontend with token
  }
);

// ✅ Protected Profile Route (To Check Login Status)
app.get("/profile", (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  res.json({ username: req.user.username });
});

// ✅ Logout Route
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
