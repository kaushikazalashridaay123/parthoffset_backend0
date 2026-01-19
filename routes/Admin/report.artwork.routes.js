const express = require("express");
const checkPermission = require("../../middlewares/checkPermission");
const { reportartwork } = require("../../models/report.artwork");

const router = express.Router();

router.get(
    "/art-work",
    checkPermission("artWork_read"),
    reportartwork
);

module.exports = router;
