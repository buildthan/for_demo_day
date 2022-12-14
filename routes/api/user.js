const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await mysql.query("userList");

  res.send(users);
});

router.post("/insert", async (req, res) => {
  const users = await mysql.query("userInsert", req.body);

  res.send(JSON.stringify(users));
});

router.post("/checkDB", async (req, res) => {
  const users = await mysql.query("userCheckDB", req.body.id);

  res.send(JSON.stringify(users));
});

router.post('/update_username', async(req, res) => {
    
    const users = await  mysql.query("userUpdate", [req.body.username, req.body.id ]);
    
    res.send(JSON.stringify(users));
});


module.exports = router;
