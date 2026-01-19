const express = require("express");
const { reportEmboss } = require("../../models/report.emboss");
const checkPermission = require("../../middlewares/checkPermission");

const router = express.Router();

router.get("/emboss-downloand", checkPermission("emboss_read"), reportEmboss);

module.exports = router;
