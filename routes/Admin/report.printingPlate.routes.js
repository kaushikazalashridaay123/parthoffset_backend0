const express = require("express");
const checkPermission = require("../../middlewares/checkPermission");
const { reportPrintingPlate } = require("../../models/report.printingPlate.routes");

const router = express.Router();

router.get("/printing-plate-downloand", checkPermission("printingPlate_read"), reportPrintingPlate);

module.exports = router;
