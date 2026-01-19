const ExcelJS = require("exceljs");
const CoatingPlate = require("./coatingPlate.model");

const reportCoatingPlate = async (req, res) => {
    try {
        const { fromDate, toDate } = req.query;

        const filter = {};
        if (fromDate || toDate) {
            filter.createdAt = {};
            if (fromDate) filter.createdAt.$gte = new Date(fromDate);
            if (toDate) filter.createdAt.$lte = new Date(toDate);
        }

        const records = await CoatingPlate.find(filter)
            .populate("jobCardNo")
            .lean();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Coating Plate Report");

        worksheet.columns = [
            { header: "Job Card No", key: "jobCardNo", width: 20 },
            { header: "Paper Size", key: "paperSize", width: 20 },
            { header: "Status", key: "status", width: 20 },
        ];

        records.forEach((record) => {
            worksheet.addRow({
                jobCardNo: record.jobCardNo?.jobCardNo || "",
                paperSize: record.jobCardNo?.jobPaperSize || "",
                status: record.status || "",
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="CoatingPlateReport.xlsx"'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error("Error generating Coating Plate report:", err);
        res.status(500).json({
            message: "Error generating Coating Plate report",
            error: err.message,
        });
    }
};

module.exports = { reportCoatingPlate };
