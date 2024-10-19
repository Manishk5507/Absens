if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const User = require("./models/user.model");
const userRoutes = require("./routes/users.route");
const findMissingRoutes = require("./routes/findMissing.route");
const reportMissingRoutes = require("./routes/reportMissing.route");
const MongoStore = require("connect-mongo");

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Replace with the URL of your frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow credentials if needed
  })
);

const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Express built-in middleware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbUrl = process.env.MONGO_URI;

async function main() {
  try {
    await mongoose.connect(dbUrl); // No need for useNewUrlParser and useUnifiedTopology options
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

main();

// Middleware for cookies and session management
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET || "dkjfbdfjbdjfdb",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: dbUrl,
      collectionName: "sessions",
      ttl:  7 * 24 * 60 * 60, // Sessions last for 3 hours
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    },
  })
);

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // Uncommented and configured the LocalStrategy
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/findMissing", findMissingRoutes);
app.use("/api/reportMissing", reportMissingRoutes);

// Catch-all for 404 errors
app.all("*", (req, res, next) => {
  next(new Error("Page Not Found", 404));
});

// Error Handler
app.use((err, req, res, next) => {
  // console.log(err);
  let { status = 500, message = "Something went wrong" } = err;
  console.log(status, message);
  return;
}); 
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

