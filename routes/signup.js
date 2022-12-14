const express = require("express");
const fs = require("fs");
const request = require("request");
const crypto = require("crypto");

const router = express.Router();

// get
router.get("/", function (req, res) {
  fs.readFile("./views/signup.html", function (err, data) {
    if (err) {
      res.send("에러");
    } else {
      res.writeHead(200, { "Content-Type": "signup.html" });
      res.write(data);
      res.end();
    }
  });
});

router.post("/", async (req, res) => {
  const id = req.body.id;
  const password = req.body.password;

  // checkID
  const options_checkId = {
    url: req.headers.origin + "/api/user/checkDB ",
    method: "POST",
    form: {
      id: id,
    },
  };

  request.post(options_checkId, function (err, httpResponse, body) {
    const get_Id = body.slice(1, -1);

    if (get_Id != "") {
      res.send(
        "<script>alert('이미 존재하는 아이디입니다.'); location.href='/signup';</script>"
      );
    } else {
      const new_salt = crypto.randomBytes(32).toString("base64");
      const new_password = crypto
        .pbkdf2Sync(password, new_salt, 1, 32, "sha512")
        .toString("base64");
        const nickname = req.body.nickname;
        const nickname2 = req.body.nickname2;
        const nickname3 = req.body.nickname3;

      // user insert
      const options_insert = {
        url: req.headers.origin + "/api/user/insert ",
        method: "POST",
        form: {
          id: id,
          password: new_password,
          salt: new_salt,
          username: nickname,
        },
      };

      request.post(options_insert, function (err, httpResponse, body) {
        if (err) console.log(err);
      });

      // user_details insert
      //회원가입하면 자동으로 user_detail 테이블에 생성되도록
  
      // nickname insert
      const options_nickname = {
        url: req.headers.origin + "/api/profile/insert",
        method: "POST",
        form: {
          id: id,
          username1: nickname,
          username2: nickname2,
          username3: nickname3
        },
      };

      request.post(options_nickname, function (err, httpResponse, body) {
        if (err) console.log(err);
      });

      const options_insert_user_detail_1 = {
        url: req.headers.origin + '/api/user_detail/insert', 
        method: 'POST',
        form: {
          id: id,
          username: nickname,
        } 
      };

    request.post(options_insert_user_detail_1, function(err, httpResponse, body){
        if(err) console.log(err);
    });

    const options_insert_user_detail_2 = {
        url: req.headers.origin + '/api/user_detail/insert', 
        method: 'POST',
        form: {
          id: id,
          username: nickname2
        } 
    };

    request.post(options_insert_user_detail_2, function(err, httpResponse, body){
        if(err) console.log(err);
    });

    const options_insert_user_detail_3 = {
        url: req.headers.origin + '/api/user_detail/insert', 
        method: 'POST',
        form: {
          id: id,
          username: nickname3
        } 
    };

    request.post(options_insert_user_detail_3, function(err, httpResponse, body){
        if(err) console.log(err);
    });

      // 회원 가입 성공 후 어떻게 할 지 생각
      res.redirect("/");
    }
  });
});

module.exports = router;
