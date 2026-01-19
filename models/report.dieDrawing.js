const ExcelJS = require("exceljs");
const DieDrawing = require("./dieDrawing.model");

const reportDieDrawing = async (req, res) => {
    try {
        const { fromDate, toDate } = req.query;

        const filter = {};
        if (fromDate || toDate) {
            filter.createdAt = {};
            if (fromDate) filter.createdAt.$gte = new Date(fromDate);
            if (toDate) filter.createdAt.$lte = new Date(toDate);
        }

        const dieDrawings = await DieDrawing.find(filter)
            .populate("jobCardNo")
            .lean();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Die Drawing Report");

        worksheet.columns = [
            { header: "Job Card No", key: "jobCardNo", width: 20 },
            { header: "Paper Size", key: "paperSize", width: 20 },
            { header: "Sent Date", key: "sendingDate", width: 20 },
            { header: "Approval Date", key: "receivedApprovalDate", width: 20 },
            { header: "Type", key: "type", width: 15 },
            { header: "Status", key: "status", width: 15 },
        ];

        dieDrawings.forEach((record) => {
            worksheet.addRow({
                jobCardNo: record.jobCardNo?.jobCardNo || "",
                paperSize: record.jobCardNo?.jobPaperSize || "",
                sendingDate: record.sendingDate ? new Date(record.sendingDate).toLocaleDateString() : "",
                receivedApprovalDate: record.receivedApprovalDate
                    ? new Date(record.receivedApprovalDate).toLocaleDateString()
                    : "",
                type: record.Type || "",
                status: record.status || "",
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="DieDrawingReport.xlsx"'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error("Error generating Die Drawing report:", err);
        res.status(500).json({
            message: "Error generating Die Drawing report",
            error: err.message,
        });
    }
};

module.exports = { reportDieDrawing };
