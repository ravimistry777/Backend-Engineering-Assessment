const express = require("express");

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api", require("../src/routes/orderRoutes"));

app.get("/", (req, res) => {
    res.send("backend engineering assessment API");
})

module.exports = app;