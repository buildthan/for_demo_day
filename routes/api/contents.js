const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();

router.get("/show_contents", async (req, res) => {
  const contents = await mysql.query("contentsList", [
    req.session.loginId,
    req.session.username,
  ]); 
  res.send(JSON.stringify(contents));
});

router.post("/update_incre", async (req, res) => {
  const contents = await mysql.query("contentsSwitch", [
    req.body.incre,
    req.body.contents_id,
  ]); //나중에 testid 부분을 req.session.id로 바꿔준다.
  res.send(JSON.stringify(contents));
});

router.post("/update_contents", async (req, res) => {
  const contents = await mysql.query("contentsUpdate", [
    req.body.title,
    req.body.contents,
    req.body.contents_id,
  ]);

  res.send(JSON.stringify(contents));
});


router.post('/show_contents', async(req, res) => {
    const contents = await  mysql.query("contentsList", [req.body.id, req.body.username]);
    res.send(JSON.stringify(contents));
});

router.post('/update_incre', async(req, res) => {

    const contents = await  mysql.query("contentsSwitch", [req.body.incre, req.body.contents_id]); 
    res.send(JSON.stringify(contents));
});

router.post('/insert', async(req, res) => {

    const contents = await  mysql.query("contentsInsert", req.body); 

    res.send(JSON.stringify(contents));
});

router.post('/select_insertid', async(req, res) => {

    const contents = await  mysql.query("select_last_insertid"); 

    res.send(JSON.stringify(contents));
});

router.post('/update_username', async(req, res) => {

    const contents = await  mysql.query("contentsUpdate_username", [req.body.username1, req.body.id,req.body.username]); 
    res.send(JSON.stringify(contents));
});

router.delete("/delete", async (req, res) => {
  const result = await mysql.query("contentsDelete", req.body.contents_id);

  res.send(JSON.stringify(result));
});

module.exports = router;
