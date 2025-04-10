require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const extendedAuthRoutes = require("./Routes/authRouter"); // ✅ match filename
require("./Models/db"); // ✅ MongoDB connection handled here

const app = express();
const authRoutes = require("./Routes/authRouter"); // Google OAuth routes

const PORT = process.env.PORT || 8080;

// Middleware
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

// ✅ Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = { username: profile.displayName };
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
      return done(null, { username: profile.displayName, token });
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Routes
app.use("/auth", authRoutes); // 🔹 Google OAuth routes
app.use("/api/auth", extendedAuthRoutes); // 🔹 Signup/Login/Vehicle Register routes

// 🔹 Google Auth endpoints
app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const token = req.user.token;
    res.redirect(`http://localhost:5173/login?token=${token}`); // redirect with JWT token
  }
);

// ✅ Profile check route
app.get("/profile", (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  res.json({ username: req.user.username });
});

// ✅ Logout route
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
