const express = require("express");
const router = express.Router();

const FindMissing = require("../models/findMissing.model");
const wrapAsync = require("../utils/wrapAsync");

// Add a new report
router.post("/add", async (req, res) => {
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
      image,
    });

    const report = await newFindMissing.save();
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Failed to add report" });
  }
});

// Get all reports
router.get("/all", async (req, res) => {
  try {
    const reports = await FindMissing.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// Get a single report by ID
router.get("/single/:id", async (req, res) => {
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
