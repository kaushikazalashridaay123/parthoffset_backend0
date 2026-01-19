const ExcelJS = require("exceljs");
const Foils = require("./foils.model");

const reportFoils = async (req, res) => {
    try {
        const { fromDate, toDate } = req.query;

        const filter = {};
        if (fromDate || toDate) {
            filter.createdAt = {};
            if (fromDate) filter.createdAt.$gte = new Date(fromDate);
            if (toDate) filter.createdAt.$lte = new Date(toDate);
        }

        const foils = await Foils.find(filter)
            .populate("productId artWorkId")
            .lean();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Foils Report");

        worksheet.columns = [
            { header: "Art Work No", key: "artWorkNo", width: 20 },
            { header: "PO No", key: "poNo", width: 20 },
            { header: "Date", key: "date", width: 15 },
            { header: "Product", key: "product", width: 25 },
            { header: "Status", key: "status", width: 15 },
        ];

        foils.forEach((foil) => {
            worksheet.addRow({
                artWorkNo: foil.artWorkId?.artWorkNo || "",
                poNo: foil.artWorkId?.poNo || "",
                date: foil.date ? new Date(foil.date).toLocaleDateString() : "",
                product: foil.productId?.productName || "",
                status: foil.status || "",
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="FoilsReport.xlsx"'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error("Error generating Foils report:", err);
        res.status(500).json({
            message: "Error generating Foils report",
            error: err.message,
        });
    }
};

module.exports = { reportFoils };
