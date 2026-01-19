const express = require("express");
const { reportJobSheetPreparation } = require("../../models/report.jobSheetPreparation");
const checkPermission = require("../../middlewares/checkPermission");

const router = express.Router();

router.get(
    "/jobSheet-downloand",
    checkPermission("jobSheetPreparation_read"),
    reportJobSheetPreparation
);

module.exports = router;
