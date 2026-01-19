const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadRouter = express.Router();

// Middleware to extract `folderName` from query
uploadRouter.use((req, res, next) => {
  const folderName = req.query.folderName || "default";
  req.folderName = folderName;
  req.uploadPath = path.join(__dirname, "../uploads", folderName);

  // Create folder if not exists
  fs.mkdirSync(req.uploadPath, { recursive: true });

  next();
});

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, req.uploadPath);
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname.replaceAll(" ", "_")}`;
    file.storedFileName = fileName;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

uploadRouter.post("/", upload.array("files", 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "No files uploaded", status: false });
    }

    const filePaths = req.files.map(
      (file) => `${req.folderName}/${file.storedFileName}`
    );

    res.json({
      message: "Files uploaded successfully",
      status: true,
      files: filePaths,
    });
  } catch (error) {
    console.log("File Upload Error:", error);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
});

module.exports = uploadRouter;
