const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();

router.get("/", async (req, res) => {
    const users = await mysql.query("profileList");

    res.send(users);
});

router.post('/insert', async(req, res) => {
    const users = await  mysql.query("profileInsert", req.body);

    res.send(JSON.stringify(users));
});

router.post('/check', async(req, res) => {
    const users = await  mysql.query("profileCheck", req.body.id);

    res.send(JSON.stringify(users));
});

router.get('/check', async(req, res) => {
    const users = await  mysql.query("profileCheck", req.session.loginId);

    res.send(JSON.stringify(users));
});

router.post('/update1', async(req, res) => {
    const users = await  mysql.query("profileUpdate1", [req.body.username1, req.body.id ,req.body.username]);

    res.send(JSON.stringify(users));
});

router.post('/update2', async(req, res) => {
    const users = await  mysql.query("profileUpdate2", [req.body.username1, req.body.id ,req.body.username]);

    res.send(JSON.stringify(users));
});


router.post('/update3', async(req, res) => {
    const users = await  mysql.query("profileUpdate3", [req.body.username1, req.body.id ,req.body.username]);

    res.send(JSON.stringify(users));
});



module.exports = router;