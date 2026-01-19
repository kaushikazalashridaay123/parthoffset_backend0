const express = require("express");
const { reportDieDrawing } = require("../../models/report.dieDrawing");
const checkPermission = require("../../middlewares/checkPermission");

const router = express.Router();

router.get("/die-drawing-downloand", checkPermission("dieDrawing_read"), reportDieDrawing);

module.exports = router;
