const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("backend engineering assessment API");
})

module.exports = app;