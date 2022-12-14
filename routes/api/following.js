const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();

router.post("/update_username", async (req, res) => {
  const temp = await mysql.query("following_update_username", [
    req.body.username1,
    req.body.id,
    req.body.username,
  ]);

  res.send(JSON.stringify(temp));
});

router.post("/update_username2", async (req, res) => {
  const temp = await mysql.query("following_update_username2", [
    req.body.username1,
    req.body.id,
    req.body.username,
  ]);

  res.send(JSON.stringify(temp));
});

router.get("/", async (req, res) => {
  const followings = await mysql.query("followingList", [
    req.session.loginId,
    req.session.username,
  ]);

  res.send(followings);
});

router.post("/", async (req, res) => {
  const followings = await mysql.query("followingList", [
    req.body.id,
    req.body.username,
  ]);

  res.send(followings);
});

//팔로잉 추가할 때 팔로잉 추가됨
router.post("/insert", async (req, res) => {
  const users = await mysql.query("followingInsert", [
    req.session.loginId,
    req.session.username,
    req.body.following_id,
    req.body.following_username,
  ]);

  const users2 = await mysql.query("followerInsert", [
    req.body.following_id,
    req.body.following_username,
    req.session.loginId,
    req.session.username,
  ]);

  res.send(JSON.stringify(users, users2));
});

router.post("/update_num", async (req, res) => {
  const users = await mysql.query("user_detail_following_num_Update", [
    req.session.loginId,
    req.session.username,
    req.session.loginId,
    req.session.username,
  ]);

  res.send(JSON.stringify(users));
});

router.post("/update_num2", async (req, res) => {
  const users = await mysql.query("user_detail_following_num_Update", [
    req.body.id,
    req.body.username,
    req.body.id,
    req.body.username,
  ]);

  res.send(JSON.stringify(users));
});

router.delete("/delete", async (req, res) => {
  const result = await mysql.query("followingDelete", [
    req.session.loginId,
    req.session.username,
    req.body.following_id,
    req.body.following_username,
  ]);

  const result2 = await mysql.query("followerDelete", [
    req.body.following_id,
    req.body.following_username,
    req.session.loginId,
    req.session.username,
  ]);

  res.send(JSON.stringify(result));
});

router.get("/getData", async (req, res) => {
  const contents = await mysql.query("followingList", [
    req.session.loginId,
    req.session.username,
  ]); //나중에 testid 부분을 req.session.id로 바꿔준다.
  res.send(JSON.stringify(contents));
});

router.post("/follow_check", async (req, res) => {
  const followings = await mysql.query("followingCheck", [
    req.session.loginId,
    req.session.username,
    req.body.id,
    req.body.username,
  ]);

  res.send(followings);
});

module.exports = router;
