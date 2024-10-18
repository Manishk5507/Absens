const express = require("express");
const router = express.Router();

// register path using passport js

const passport = require("passport");

const User = require("../models/user.model");

router.post("/register", (req, res) => {
  User.register(
    {
      username: req.body.username,
      email: req.body.email,
    },
    req.body.password,
    (err, user) => {
      if (err) {
        res.json({ error: err });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.json({ message: "User Registered Successfully ", user: user });
        });
      }
    }
  );
});

router.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  // Try to log in the user
  passport.authenticate("local", (err, authenticatedUser, info) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!authenticatedUser) {
      // Invalid username or password
      return res.status(401).json({ error: "Wrong username or password" });
    }

    req.login(authenticatedUser, (err) => {
      if (err) {
        return res.status(500).json({ error: "Login error" });
      }
      // Login successful
      res.json({ message: "Successfully Logged In", user: req.user });
    });
  })(req, res);
});

router.get("/forgot-password", (req, res) => {
  res.send("Forgot Password");
});

// Update user profile
router.post("/update-profile/:id", async (req, res) => {
  const {
    username,
    email,
    firstName,
    lastName,
    address,
    country,
    streetAddress,
    city,
    state,
    postalCode,
  } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        username,
        email,
        firstName,
        lastName,
        address,
        country,
        streetAddress,
        city,
        state,
        postalCode,
      },
      { new: true, runValidators: true } // `new` returns the updated document, `runValidators` applies the schema validators
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/reset-password", (req, res) => {
  res.send("Reset Password");
});

router.get("/logout", (req, res) => {
  // console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Logout failed due to an error." });
      }
      
      return res.json({ message: "Successfully Logged Out" });
    });
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized. No user session found." });
  }
});

module.exports = router;
