const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const FindMissing = require("../models/findMissing.model");
const wrapAsync = require("../utils/wrapAsync");
const cloudinary = require("../config/cloudConfig");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

// Add a new report
router.post("/add/:userId", upload.array("images", 8), async (req, res) => {
  // console.log(req.body);
  try {
    const {
      name,
      age,
      gender,
      height,
      weight,
      hairColor,
      eyeColor,
      lastSeenDate,
      lastSeenLocation,
      additionalInfo,
      relationshipWithMissing,
      image,
    } = req.body;

    const userId = req.params.userId;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Ensure that at least two images are uploaded
    if (!req.files || req.files.length < 2) {
      return res
        .status(400)
        .json({ message: "At least two images are required" });
    }

    // Upload images to Cloudinary
    console.log("Uploading images to Cloudinary...");
    const imageUploadPromises = req.files.map((file) =>
      cloudinary.uploader.upload(file.path, { folder: "missing_reports" })
    );

    const uploadResults = await Promise.all(imageUploadPromises);
    console.log("Cloudinary upload results:", uploadResults);

    // Create the images object structure
    const images = {
      urls: uploadResults.map((result) => result.secure_url),
      embeddings: [], // Set this to any embedding data you might want to store
    };


    const newFindMissing = new FindMissing({
      name,
      age,
      gender,
      height,
      weight,
      hairColor,
      eyeColor,
      lastSeenDate,
      lastSeenLocation,
      additionalInfo,
      relationshipWithMissing,
      images,
      user: userId,
    });

    const report = await newFindMissing.save();
    const user = await User.findById(userId);
    user.findingCases.push(report._id);
    await user.save();
    req.files.forEach((file) => fs.unlinkSync(file.path));
    res.status(201).json({ message: "Report added successfully", report });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add report" });
  }
});

// Get all reports
router.get("/getAll", async (req, res) => {
  try {
    const reports = await FindMissing.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// Get a single report by ID
router.get("/get/:id", async (req, res) => {
  try {
    const report = await FindMissing.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch report" });
  }
});

router.get("/user-finding-cases/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("findingCases");
    const reports = await user.findingCases;
    res.status(200).json(reports);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving data", error: error.message });
  }
});

// Update a report by ID
router.post("/update/:id", async (req, res) => {
  try {
    const report = await FindMissing.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    Object.assign(report, req.body);
    const updatedReport = await report.save();
    res.json(updatedReport);
  } catch (error) {
    res.status(500).json({ error: "Failed to update report" });
  }
});

// Delete a report by ID
router.post("/delete/:id", async (req, res) => {
  try {
    const report = await FindMissing.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json({ message: "Report Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete report" });
  }
});

// Update report status by ID
router.post("/status/:id", async (req, res) => {
  try {
    const report = await FindMissing.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    report.status = req.body.status;
    const updatedReport = await report.save();
    res.json(updatedReport);
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

// Delete all reports
router.post("/delete-all", async (req, res) => {
  try {
    await FindMissing.deleteMany();
    res.json({ message: "All Reports Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete all reports" });
  }
});

module.exports = router;
