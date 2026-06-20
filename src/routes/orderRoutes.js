const express = require("express");

const routes = express.Router();

const { upload } = require("../middleware/upload");
const { uploadOrders } = require("../controller/orderController");

routes.post("/upload-orders", upload.single("orderFile"), uploadOrders);

module.exports = routes;