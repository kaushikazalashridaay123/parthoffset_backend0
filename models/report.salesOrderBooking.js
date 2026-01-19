const ExcelJS = require("exceljs");
const SalesOrderBooking = require("./salesOrderBooking.model");

const reportsalesOrderBooking = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;

    // Build date filter
    const filter = {};
    if (fromDate || toDate) {
      filter.date = {};
      if (fromDate) filter.date.$gte = new Date(fromDate);
      if (toDate) {
        // include whole toDate day
        const d = new Date(toDate);
        d.setHours(23, 59, 59, 999);
        filter.date.$lte = d;
      }
    }

    // You may also accept other filter query params if needed
    const orders = await SalesOrderBooking.find(filter)
      .populate("client product category")
      .lean();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sales Order Booking");

    // Define columns you need in Excel (adjust header/key as required)
    worksheet.columns = [
      { header: "SOB No", key: "sobNo", width: 15 },
      { header: "Order No", key: "orderNo", width: 18 },
      { header: "Date", key: "date", width: 15 },
      { header: "Client", key: "client", width: 25 },
      { header: "Product", key: "product", width: 25 },
      { header: "Category", key: "category", width: 20 },
      { header: "Quantity", key: "totalQuantity", width: 12 },
      { header: "Sales Order Booking Status", key: "salesOrderBookingStatus", width: 20 },
      { header: "Status", key: "status", width: 10 },
    ];

    // Add rows
    orders.forEach((o) => {
      worksheet.addRow({
        sobNo: o.sobNo || "",
        orderNo: o.orderNo || "",
        date: o.date ? new Date(o.date).toLocaleDateString() : "",
        client: o.client?.clientName || "",
        product: o.product?.productName || "",
        category: o.category?.name || "",
        totalQuantity: o.totalQuantity || 0,
        salesOrderBookingStatus: o.salesOrderBookingStatus || "",
        status: o.status || "",
      });
    });

    // Set response headers for download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    const filename = `SalesOrderBookingReport_${fromDate || "all"}_${toDate || "all"}.xlsx`;
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    // Stream workbook to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Export error:", err);
    res.status(500).json({ message: "Error generating report", error: err.message });
  }
};

module.exports = { reportsalesOrderBooking };
