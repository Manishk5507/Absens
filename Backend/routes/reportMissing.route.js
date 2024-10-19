const express = require("express");
const router = express.Router();
const ReportMissing = require("../models/reportMissing.model");
const User = require("../models/user.model");
const cloudinary = require("../config/cloudConfig");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

// Route to add a new missing report
router.post("/add/:userId", upload.array("images", 8), async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Uploaded files:", req.files);
  try {
    const {
      name,
      age,
      gender,
      height,
      weight,
      hairColor,
      eyeColor,
      whenFound,
      whereFound,
      additionalInfo,
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

    // Create a new report instance
    const newReportMissing = new ReportMissing({
      name,
      age,
      gender,
      height,
      weight,
      hairColor,
      eyeColor,
      whenFound,
      whereFound,
      additionalInfo,
      images,
      user: userId,
    });

    const user = await User.findById(userId);

    // Save the report to the database
    const report = await newReportMissing.save();
    user.reportedCases.push(report._id);
    await user.save();

    // Delete uploaded files from the server
    req.files.forEach((file) => fs.unlinkSync(file.path));

    res.status(201).json({ message: "Report added successfully", report });
  } catch (error) {
    console.error("Error adding report:", error);
    res
      .status(500)
      .json({ message: "Error adding report", error: error.message });
  }
});

// Route to get all reports
router.get("/getAll", async (req, res) => {
  try {
    const reports = await ReportMissing.find();
    res.status(200).json(reports);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving reports", error: error.message });
  }
});

// Route to get a specific report by ID
router.get("/get/:id", async (req, res) => {
  try {
    // Find the report by ID and populate the 'user' field
    const report = await ReportMissing.findById(req.params.id).populate(
      "user",
      "username email"
    ); // Adjust the fields as needed

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(report);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving report", error: error.message });
  }
});

router.get("/user-reported-cases/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("reportedCases");
    const reports = await user.reportedCases;
    res.status(200).json(reports);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving reports", error: error.message });
  }
});

// Route to update a report by ID
router.put("/update/:id", async (req, res) => {
  try {
    const updatedReport = await ReportMissing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(updatedReport);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating report", error: error.message });
  }
});

// Route to delete a report by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedReport = await ReportMissing.findByIdAndDelete(req.params.id);
    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting report", error: error.message });
  }
});

module.exports = router;
