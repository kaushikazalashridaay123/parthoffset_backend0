const express = require("express");
const checkPermission = require("../../middlewares/checkPermission");
const { reportOrderReceived } = require("../../models/report.orderReceives");

const router = express.Router();

// Add permission middleware if needed
router.get("/order-received", checkPermission("orderReceived_read"), reportOrderReceived);

module.exports = router;
