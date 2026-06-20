const parseCSV = require("../services/csvService");


exports.uploadOrders = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        // return res.status(200).json({ success: true, message: "file uploaded success", file: req.file.filename });
        console.log("Controller Calling parseCSV");
        const result = await parseCSV(req.file.path);

        return res.status(200).json({ success: true, ...result });


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}