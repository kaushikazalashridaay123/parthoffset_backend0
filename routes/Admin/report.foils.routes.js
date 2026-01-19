const express = require("express");
const { reportFoils } = require("../../models/report.foils");
const checkPermission = require("../../middlewares/checkPermission");

const router = express.Router();

router.get("/foils-downloand", checkPermission("foils_read"), reportFoils);

module.exports = router;
