const express = require("express");
const fs = require("fs");
const crypto  = require('crypto');
const jwt  = require("jsonwebtoken");
const request = require('request');

const router = express.Router();

// get
router.get('/', function(req, res){

    if(req.session.loginId){ //세션값에 로그인 정보가 남아있는 경우 바로 홈으로 이동
      res.redirect("/home");
    }else{
      fs.readFile('./views/index.html', function(err, data){ //아닐경우 로그인 페이지를 띄운다.
        if(err){
            res.send('에러');
        }
        else{
            res.writeHead(200, {'Content-Type': 'index.html'});
            res.write(data);
            res.end();
        }
    });
    }
});

router.post('/', async(req, res) => {
  const check_id = req.body.id;
  const check_password = req.body.password;

  // checkId
  const options = {
    url: req.headers.origin + '/api/user/checkDB', 
    method: 'POST',
    form: {
      id: check_id,
    }
  };

  request.post(options, function(err, httpResponse, body){
    const get_DB = body.slice(1, -1);

    if(get_DB == ""){
      return res.send("<script>alert('아이디가 일치하지 않습니다.'); location.href='/';</script>");
    }
    else{
      const password = JSON.parse(get_DB).password;
      const salt = JSON.parse(get_DB).salt;

      const sal_password = crypto.pbkdf2Sync(check_password, salt, 1, 32, 'sha512').toString('base64');

      if(sal_password != password){
        return res.send("<script>alert('비밀번호가 일치하지 않습니다.'); location.href='/';</script>");
      }

      else{
          // profile 
          const check_profile = {
            url: req.headers.origin + '/api/user/CheckDB', 
            method: 'POST',
            form: {
              id: check_id,
            }
          };

          request.post(check_profile, function(err, httpResponse, body){

            const profile_DB = JSON.parse(body.slice(1, -1));

            const key = process.env.SECRET_KEY;

            let token = jwt.sign({
                type: 'JWT',
                id: check_id,
                password: sal_password,
              },
              key,{
                expiresIn: "15m", // 15분후 만료
                issuer: "토큰발급자",
            }); 

            console.log(profile_DB);
            req.session.loginId = check_id;
            req.session.username = profile_DB.username;
            req.session.save(error => {if(error) console.log(error);});

            //res.json(token);

            res.redirect('/home');            
          });
        }
      }
  });
});

router.post('/session', function(req, res){
 // profile 
 const check_profile = {
  url: req.headers.origin + '/api/profile/check', 
  method: 'POST',
  form: {
    id: check_id,
  }
};

request.post(check_profile, function(err, httpResponse, body){

  const profile_DB = JSON.parse(body.slice(1, -1));

  const key = process.env.SECRET_KEY;

  let token = jwt.sign({
        type: 'JWT',
        id: check_id,
        password: sal_password,
      },
    key,{
        expiresIn: "15m", // 15분후 만료
        issuer: "토큰발급자",
    }); 

    req.session.loginId = check_id;
    req.session.loginprofile = profile_DB.checkprofile;
    req.session.save(error => {if(error) console.log(error);});

    res.status(200).json({
      token: token,
      id: check_id
    });
    res.redirect('/home');            
});
});

module.exports = router;
