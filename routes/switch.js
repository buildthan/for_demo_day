const express = require("express");
const fs = require("fs");
const request = require('request');

const router = express.Router();

// get
router.get('/', function(req, res){
    fs.readFile('./views/switch.html', function(err, data){
        if(err){
            res.send('에러');
        }
        else{
            res.writeHead(200, {'Content-Type': 'switch.html'});
            res.write(data);
            res.end();
        }
    });
});

router.post('/', function(req, res){

    const options = { //프로필 데이터를 받아오는 작업
        url: req.headers.origin + '/api/profile/check', 
        method: 'POST',
        form: {
            id:req.session.loginId
        }
      };
    
      request.post(options, function(err, httpResponse, body){ 
        if(err) console.log(err);

        const username = JSON.parse(body.slice(1, -1));
  
        username_list = Object.values(username);

        if(req.body.username_hidden == 1){ //1번 프로필의 게시글 편집을 누른 경우
            req.session.username = username_list[1];

            let options1 = { //following의 username을 수정해주는 작업
                url: req.headers.origin + '/api/user/update_username', 
                method: 'POST',
                form: {
                  id: req.session.loginId,
                  username: username_list[1]
                }
              };
            
              request.post(options1, function(err, httpResponse, body){
                if(err) console.log(err);

                res.redirect("/switch");
              });
        }else if(req.body.username_hidden == 2){ //2번 프로필의 게시글 편집을 누른 경우
            req.session.username = username_list[3];

            let options2 = { //following의 username을 수정해주는 작업
                url: req.headers.origin + '/api/user/update_username', 
                method: 'POST',
                form: {
                  id: req.session.loginId,
                  username: username_list[3]
                }
              };
            
              request.post(options2, function(err, httpResponse, body){
                if(err) console.log(err);

                res.redirect("/switch");
              });
        }else if(req.body.username_hidden == 3){ //3번 프로필의 게시글 편집을 누른 경우
            req.session.username = username_list[5];

            let options3 = { //following의 username을 수정해주는 작업
                url: req.headers.origin + '/api/user/update_username', 
                method: 'POST',
                form: {
                  id: req.session.loginId,
                  username: username_list[5]
                }
              };
            
              request.post(options3, function(err, httpResponse, body){
                if(err) console.log(err);

                res.redirect("/switch");
              });
        }else{
            res.redirect("/feed");
        }

      });


});

module.exports = router;