const ExcelJS = require("exceljs");
const JobSheetPreparation = require("./jobSheetPreparation.model");

const reportJobSheetPreparation = async (req, res) => {
    try {
        const { fromDate, toDate } = req.query;

        const filter = {};
        if (fromDate || toDate) {
            filter.createdAt = {};
            if (fromDate) filter.createdAt.$gte = new Date(fromDate);
            if (toDate) filter.createdAt.$lte = new Date(toDate);
        }

        // Populate artwork details and related data
        const jobs = await JobSheetPreparation.find(filter)
            .populate({
                path: "artWorkDetails",
                populate: {
                    path: "client product category",
                },
            })
            .lean();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Job Sheet Preparation");

        worksheet.columns = [
            { header: "Job Card No", key: "jobCardNo", width: 20 },
            { header: "SOB ID", key: "sobId", width: 20 },
            { header: "Artwork Status", key: "artworkStatus", width: 20 },
            { header: "Job Sheet Status", key: "jobSheetStatus", width: 20 },
            { header: "Job Card Flag", key: "jobCardFlag", width: 15 },
            { header: "Status", key: "status", width: 15 },
        ];

        jobs.forEach((job) => {
            const totalArtworks = job.artWorkDetails?.length || 0;
            const completedArtworks =
                job.artWorkDetails?.filter(
                    (aw) => aw.artWorkStatus?.toLowerCase() === "complete"
                ).length || 0;

            const sobNo =
                job.artWorkDetails?.map((aw) => aw.sobNo).join(", ") || "";

            const isJobComplete =
                job.jobSheetStatus?.toLowerCase() === "complete" ? "Complete" : "Pending";
            const jobCardFlag =
                job.jobCardFlag === true || job.jobCardFlag === "true"
                    ? "Done"
                    : "Pending";

            worksheet.addRow({
                jobCardNo: job.jobCardNo || "",
                sobId: sobNo,
                artworkStatus: `${completedArtworks}/${totalArtworks}`,
                jobSheetStatus: isJobComplete,
                jobCardFlag: jobCardFlag,
                status: job.status || "",
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="JobSheetPreparationReport.xlsx"'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error("Error generating Job Sheet Preparation report:", err);
        res.status(500).json({
            message: "Error generating Job Sheet Preparation report",
            error: err.message,
        });
    }
};

module.exports = { reportJobSheetPreparation };
