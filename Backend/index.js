// require("dotenv").config();
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const session = require("express-session");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const jwt = require("jsonwebtoken");
// const extendedAuthRoutes = require("./Routes/authRouter"); // ✅ match filename
// const UserVehicle = require("./Routes/vehicleRoutes")
// require("./Models/db"); // ✅ MongoDB connection handled here
// require('./Models/postgressdb') // postgres connection here
// const vehiclePostgresRoutes = require('./Routes/vehiclePostgresRoutes');
// const BikePostgressRoutes = require('./Routes/BikePostgressRouter')
// const AutoPostgressRoutes = require('./Routes/AutoPostgresRouter')
// const paymentdata = require('./Routes/PaymentData')
// const chat  = require('./Routes/chatRoutes.js')
// const RazorPayment = require('./Routes/RazorPayment.js')
// const intailclaim  = require('./Routes/Intailclaim.js')
// const accidentform = require('./Routes/Accidentform.js')
// const finaldocument = require('./Routes/Finaldocumentclaim.js')
// const contact = require('./Routes/ContactUs.js')
// const award = require('./Routes/doctorAward.js')
// const postgres = require("./Models/postgressdb.js");
// const redis = require("./redisclient.js");
// const app = express();

// // IMPORTANT: Configure JSON body parsers with increased limits ONCE, at the top level
// // This ensures all routes benefit from the increased limits
// app.use(express.json({ limit: '100mb' }));
// app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// // Configure bodyParser with the same limits for consistency
// app.use(bodyParser.json({ limit: '100mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));

// const authRoutes = require("./Routes/authRouter"); // Google OAuth routes

// const PORT = process.env.PORT || 8080;

// // Middleware for CORS
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
//   methods: ["GET", "POST"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

// // API Routes
// app.use('/api', vehiclePostgresRoutes);
// app.use('/api', BikePostgressRoutes);
// app.use('/api', AutoPostgressRoutes);
// app.use('/api', paymentdata);
// app.use('/api', chat);
// app.use('/api', RazorPayment);
// app.use('/api',intailclaim);
// app.use('/api',accidentform);
// app.use('/api',finaldocument);
// app.use('/api',contact)
// app.use('/api',award)
// app.get("/", (req, res) => {
//   res.send("Backend running with Postgres + Redis ✅");
// });


// // Session configuration
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "secret",
//     resave: false,
//     saveUninitialized: true,
//   })  
// );

// app.use(passport.initialize());
// app.use(passport.session());

// // ✅ Google OAuth Strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.CALLBACK_URL
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const user = { username: profile.displayName };
//       const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
//       return done(null, { username: profile.displayName, token });
//     }
//   )
// );

// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((user, done) => done(null, user));

// // Routes
// app.use("/auth", authRoutes); // 🔹 Google OAuth routes
// app.use("/api/auth", extendedAuthRoutes); // 🔹 Signup/Login/Vehicle Register routes
// app.use("/api/auth", UserVehicle); // 🔹 Signup/Login/Vehicle Register routes

// // 🔹 Google Auth endpoints
// app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     const token = req.user.token;
//     res.redirect(`http://localhost:5173/login?token=${token}`); // redirect with JWT token
//   }
// );

// // ✅ Profile check route
// app.get("/profile", (req, res) => {
//   if (!req.user) return res.status(401).json({ message: "Unauthorized" });
//   res.json({ username: req.user.username });
// });

// // ✅ Logout route
// app.get("/logout", (req, res) => {
//   req.logout(() => {
//     res.redirect("/");
//   });
// });

// // ✅ Start the server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });


require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

// Routes
const extendedAuthRoutes = require("./Routes/authRouter"); // ✅ match filename
const UserVehicle = require("./Routes/vehicleRoutes");
const vehiclePostgresRoutes = require("./Routes/vehiclePostgresRoutes");
const BikePostgressRoutes = require("./Routes/BikePostgressRouter");
const AutoPostgressRoutes = require("./Routes/AutoPostgresRouter");
const paymentdata = require("./Routes/PaymentData");
const chat = require("./Routes/chatRoutes.js");
const RazorPayment = require("./Routes/RazorPayment.js");
const intailclaim = require("./Routes/Intailclaim.js");
const accidentform = require("./Routes/Accidentform.js");
const finaldocument = require("./Routes/Finaldocumentclaim.js");
const contact = require("./Routes/ContactUs.js");
const award = require("./Routes/doctorAward.js");

// DB connections
require("./Models/postgressdb"); // ✅ Postgres connection
const postgres = require("./Models/postgressdb.js");
const redis = require("./redisclient.js");

const app = express();

// 🔹 JSON body parsers with increased limits
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

const authRoutes = require("./Routes/authRouter"); // Google OAuth routes
const PORT = process.env.PORT || 8080;

// 🔹 CORS config
 
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://13.201.13.219:5173", // your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.get("/welcome", (req, res) => {
  res.json({
    message: "Welcome to the Global Health Backend! 🚀"
  });
});
// 🔹 API Routes
app.use("/api", vehiclePostgresRoutes);
app.use("/api", BikePostgressRoutes);
app.use("/api", AutoPostgressRoutes);
app.use("/api", paymentdata);
app.use("/api", chat);
app.use("/api", RazorPayment);
app.use("/api", intailclaim);
app.use("/api", accidentform);
app.use("/api", finaldocument);
app.use("/api", contact);
app.use("/api", award);

app.get("/", (req, res) => {
  res.send("Backend running with Postgres + Redis ✅");
});

// 🔹 Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// 🔹 Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
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

// 🔹 Auth routes
app.use("/auth", authRoutes); 
app.use("/api/auth", extendedAuthRoutes);
app.use("/api/auth", UserVehicle);

// 🔹 Google Auth endpoints
app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const token = req.user.token;
    res.redirect(`${process.env.FRONTEND_URL || "http://localhost:5173"}/login?token=${token}`);
  }
);

// ✅ Profile check
app.get("/profile", (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  res.json({ username: req.user.username });
});

// ✅ Logout
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

// ✅ Start server
app.listen(8080, "0.0.0.0", () => {
  console.log("🚀 Server is running on http://0.0.0.0:8080");
});
