const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();

router.get("/", async (req, res) => {
    const sessions = await mysql.query("sessionList");

    res.send(sessions);
});

module.exports = router;