const ExcelJS = require("exceljs");
const OrderReceived = require("./orderReceived.model");

const reportOrderReceived = async (req, res) => {
    try {
        const { fromDate, toDate } = req.query;

        const filter = {};
        if (fromDate || toDate) {
            filter.createdAt = {};
            if (fromDate) filter.createdAt.$gte = new Date(fromDate);
            if (toDate) filter.createdAt.$lte = new Date(toDate);
        }

        const orders = await OrderReceived.find(filter)
            .populate("client product category")
            .lean();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Order Received");

        worksheet.columns = [
            { header: "Order No", key: "orderNo", width: 15 },
            { header: "Date", key: "date", width: 15 },
            { header: "Client", key: "client", width: 20 },
            { header: "Product", key: "product", width: 20 },
            { header: "PO No", key: "poNo", width: 15 },
            { header: "Category", key: "category", width: 20 },
            { header: "Quantity", key: "totalQuantity", width: 10 },
            { header: "Order Received Status", key: "orderReceivedStatus", width: 20 },
            { header: "Status", key: "status", width: 10 },
        ];

        orders.forEach((order) => {
            worksheet.addRow({
                orderNo: order.orderNo,
                date: order.date ? new Date(order.date).toLocaleDateString() : "",
                client: order.client?.clientName || "",
                product: order.product?.productName || "",
                poNo: order.poNo,
                category: order.category?.name || "",
                totalQuantity: order.totalQuantity,
                orderReceivedStatus: order.orderReceivedStatus,
                status: order.status,
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="OrderReceivedReport.xlsx"'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error("Error generating report:", err);
        res.status(500).json({ message: "Error generating report", error: err.message });
    }
};

module.exports = { reportOrderReceived };
