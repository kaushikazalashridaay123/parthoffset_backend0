const ExcelJS = require("exceljs");
const ArtWork = require("./artWork.model");

const reportartwork = async (req, res) => {
    try {
        const { fromDate, toDate } = req.query;

        const filter = {};
        if (fromDate || toDate) {
            filter.createdAt = {};
            if (fromDate) filter.createdAt.$gte = new Date(fromDate);
            if (toDate) filter.createdAt.$lte = new Date(toDate);
        }

        const artworks = await ArtWork.find(filter)
            .populate("client product category")
            .lean();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Art Work Report");

        worksheet.columns = [
            { header: "Art Work No", key: "artWorkNo", width: 15 },
            { header: "SOB No", key: "sobNo", width: 15 },
            { header: "Date", key: "date", width: 15 },
            { header: "Client", key: "client", width: 20 },
            { header: "Product", key: "product", width: 20 },
            { header: "Category", key: "category", width: 20 },
            { header: "Quantity", key: "totalQuantity", width: 10 },
            { header: "Art Work Status", key: "artWorkStatus", width: 20 },
            { header: "Status", key: "status", width: 10 },
        ];

        artworks.forEach((art) => {
            worksheet.addRow({
                artWorkNo: art.artWorkNo,
                sobNo: art.sobNo,
                date: art.date ? new Date(art.date).toLocaleDateString() : "",
                client: art.client?.clientName || "",
                product: art.product?.productName || "",
                category: art.category?.name || "",
                totalQuantity: art.totalQuantity,
                artWorkStatus: art.artWorkStatus,
                status: art.status,
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="ArtWorkReport.xlsx"'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error("Error generating artwork report:", err);
        res
            .status(500)
            .json({ message: "Error generating artwork report", error: err.message });
    }
};

module.exports = { reportartwork };
