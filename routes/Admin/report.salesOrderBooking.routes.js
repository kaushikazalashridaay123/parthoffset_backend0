const express = require("express");
const checkPermission = require("../../middlewares/checkPermission");
const { reportsalesOrderBooking } = require("../../models/report.salesOrderBooking");

const router = express.Router();

router.get(
    "/sales-order-booking-download",
    checkPermission("salesOrderBooking_read"),
    reportsalesOrderBooking
);

module.exports = router;
