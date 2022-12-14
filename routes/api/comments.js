const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();


router.post('/update_username', async(req, res) => {

    const temp = await  mysql.query("comments_update_username", [req.body.username1, req.body.id,req.body.username]); 

    res.send(JSON.stringify(temp));
});

router.post('/getData', async(req, res) => {
    const contents = await  mysql.query("commentsList", req.body.id); //나중에 testid 부분을 req.session.id로 바꿔준다.
    res.send(JSON.stringify(contents));
});

router.post('/setData', async(req, res) => {
    const contents = await  mysql.query("commentsInsert", [req.body.id, req.session.loginId, req.session.username, req.body.contents]); //나중에 testid 부분을 req.session.id로 바꿔준다.
    res.send(JSON.stringify([req.body.id, req.session.loginId, req.session.username, req.body.contents]));
});


module.exports = router;