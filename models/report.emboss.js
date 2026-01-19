const ExcelJS = require("exceljs");
const Emboss = require("./emboss.model");

const reportEmboss = async (req, res) => {
    try {
        const { fromDate, toDate } = req.query;

        const filter = {};
        if (fromDate || toDate) {
            filter.createdAt = {};
            if (fromDate) filter.createdAt.$gte = new Date(fromDate);
            if (toDate) filter.createdAt.$lte = new Date(toDate);
        }

        const embossRecords = await Emboss.find(filter)
            .populate("productId artWorkId")
            .lean();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Emboss Report");

        worksheet.columns = [
            { header: "Art Work No", key: "artWorkNo", width: 20 },
            { header: "PO No", key: "poNo", width: 20 },
            { header: "Date", key: "date", width: 15 },
            { header: "Product", key: "product", width: 25 },
            { header: "Status", key: "status", width: 15 },
        ];

        embossRecords.forEach((item) => {
            worksheet.addRow({
                artWorkNo: item.artWorkId?.artWorkNo || "",
                poNo: item.artWorkId?.poNo || "",
                date: item.date ? new Date(item.date).toLocaleDateString() : "",
                product: item.productId?.productName || "",
                status: item.status || "",
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="EmbossReport.xlsx"'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error("Error generating Emboss report:", err);
        res.status(500).json({
            message: "Error generating Emboss report",
            error: err.message,
        });
    }
};

module.exports = { reportEmboss };
