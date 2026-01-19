const express = require("express");
const checkPermission = require("../../middlewares/checkPermission");
const { reportCoatingPlate } = require("../../models/report.coatingPlate");

const router = express.Router();

router.get("/coating-plate-downloand", checkPermission("coatingPlate_read"), reportCoatingPlate);

module.exports = router;
