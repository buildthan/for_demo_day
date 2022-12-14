const express = require("express");
const fs = require("fs");
const request = require("request");

const router = express.Router();

const multer = require("multer");

var upload = multer({dest: 'public/uploads/'});

// get

router.get("/", function (req, res) {
  //const url = req.headers.origin + '/api/profile/check';

  //console.log(req.url);

  if (req.session.loginId) {
    //세션에 로그인 아이디가 존재하는 경우 성공적으로 피드 화면 진입.
    output = `
                
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>LetterBox</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link rel="stylesheet" href="/stylesheets/style_yumin.css" />
    </head>
  <body id="font_basic">

    <script src="/javascripts/feed.js"></script>
    
    
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
    <script>
      //툴팁 관련 함수
      $(function () {
        $('[data-toggle="tooltip"]').tooltip();
      });
    </script>

    <!-- 왼쪽 사이드바 -->
    <nav style="z-index: 2" id="nav_left">
    
      <a href="/home">
        <img src="../images/logo/logo2.png" id="logo_img" />
      </a>

      <span data-toggle="tooltip" data-placement="right" title="새 게시글 생성"
        ><img
          src="../images/icon/more.png"
          id="menu_img"
          data-toggle="modal"
          data-target="#modal_new_post"
          style="cursor: pointer"
      /></span>
      <br />

      <span
        data-toggle="tooltip"
        data-placement="right"
        title="홈 화면으로 가기"
      >
        <a href="/home"> <img src="../images/icon/home.png" id="menu_img" /></a
      ></span>
      <br />

      <span data-toggle="tooltip" data-placement="right" title="사용자 페이지">
        <a href="/feed"> <img src="../images/icon/user.png" id="menu_img" /></a>
      </span>
      <br />

      <span data-toggle="tooltip" data-placement="right" title="환경설정">
        <a href="#html">
          <img src="../images/icon/settings.png" id="menu_img"
        /></a>
      </span>
      <br />

      <div style="bottom: 0px; position: absolute">
        <span data-toggle="tooltip" data-placement="right" title="로그아웃">
          <a href="/home/logout">
            <img src="../images/icon/logout.png" id="menu_img"
          /></a>
        </span>
      </div>
    </nav>

    <!-- 상단 네비게이션바 -->
    <header>
      <nav
        class="navbar bg-light"
        style="
          width: 100%;
          height: 70px;
          border-right: 2px solid #989898;
          z-index: 1;
          position: fixed;
        "
      >
        <div class="container-fluid" style="margin-left: 70px">
          <!-- 로고  -->
          <a href="/home">
            <img src="../images/logo/logo1.png" style="height: 20px" />
          </a>

          <!-- 검색창 -->
          <form class="d-flex" role="search">
            <button
              type="button"
              class="btn btn-light"
              data-toggle="modal"
              data-target="#Modal_search"
              style="
                width: 200px;
                text-align: left;
                border: 1px solid #b9b9b9;
                color: #898989;
              "
            >
              사용자 검색
            </button>
          </form>
        </div>
      </nav>
    </header>

    <!-- 검색창 -->
    <div
      class="modal fade"
      id="Modal_search"
      tabindex="-1"
      role="dialog"
      aria-labelledby="ModalLabelSearch"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div
              class="modal-title"
              id="ModalLabelSearch"
              style="margin: 0 auto"
            >
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="사용자 검색"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  id="input_user"
                  style="width: 350px"
                />
                <button
                  class="btn btn-outline-success"
                  type="submit"
                  id="btn_search"
                  onclick="searchF()"
                >
                  검색
                </button>
              </div>
            </div>
          </div>
          <div class="modal-body">
            <div id="div_users"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 그 외 게시글 표시될 곳-->
    <main style="margin-left: 70px; padding-top: 80px">
              <div class = "container justify-content-center mt-3">
                  <div class = "row">
                      <div class="col-2">
                          <img src="../images/profile1.png" alt="#" width="120" height="120">
                      </div>
      
                      <div class = "col-7 mt-1">
                          <p id = "user_id">${req.session.loginId}</p>`;

    output += `<p id = "user_name">${req.session.username}</p>

                          <p id = "instruction"> </p>
                      </div>
      
                      <div class="col-3 row">
                          <div class = "row">
                          <div class="col-4" >

                              <p  align="center">게시물</p>
                              <p  align="center" id="contents_num"></p>

                            </div>
      
                          <div class="col-4"
                          data-toggle="modal"
                          data-target="#modal_follower"
                          id="mark_follower"
                          style="cursor: pointer">

                              <p  align="center">팔로워</p>
                              <p  align="center" id = "follower_num"></p>

                            </div>
      
                          <div class="col-4"
                          data-toggle="modal"
                          data-target="#modal_following"
                          id="mark_following"
                          style="cursor: pointer">

                              <p  align="center">팔로잉</p>
                              <p  align="center" id ="following_num"></p>

                            </div>
                          </div>
      
                          <!-- Button trigger modal -->
      <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          프로필 편집
        </button>
      
                  </div>
      
                  <div class='m-2'></div>
                  <hr>
      
      
                <!--아래에 적힌 내용은 모두 예시로 실제 js에 적용시 함수화 한다음 데이터를 받아와서 적용할 예정임-->
                
            <div id = "contents">
              
            </div>
      
                  
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">프로필 편집</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <!--여기에 프로필 편집창 내용물을 삽입-->
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">1번프로필</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">2번프로필</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">3번프로필</button>
                  </li>
                </ul>
      
                <div class="tab-content" id="myTabContent">        

                
                  <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
                
                
                  <form action="./feed/profile1" method="post" enctype="multipart/form-data" >
                  <!--프로필1번 내용물-->
      
                  <div class = "container justify-content-center mt-3">
                      <div class = "row">
                          <div class="col-4">
                              <img src="../images/profile1.png" alt="Logo" width="120" height="120">
                          </div>
          
                          <div class = "col-8 mt-4">
                              <div class="input-group mb-3">
                                  <span class="input-group-text">아이디</span>
                                  <div class="form-floating">
                                    <input type="text" class="form-control" id="user_id_1" name="user_id_1" placeholder="Username" disabled>
                                    <label for="user_id_1">${req.session.loginId}</label>
                                  </div>
                                </div>
      
                                <div class="input-group mb-3">
                                  <span class="input-group-text">이름</span>
                                  <div class="form-floating">
                                    <input type="text" class="form-control" id="user_name_1" name="user_name_1" placeholder="Username">
                                    <input type="hidden" class="form-control" id="user_name_1_hidden" name="user_name_1_hidden" placeholder="Username">
                                    <label for="user_name_1"><p id = "user_name1_label">이게 라벨인가</p></label>
                                  </div>
                                </div>
                          </div>
                      </div>
      
                      <div class = "container  justify-content-center mt-3">
                          <div class = "mb-3">소개</div>
                          <div class="form-floating">
                              <textarea class="form-control" placeholder="Leave a comment here" id="user_intro_1" name="user_intro_1"></textarea>
                              <label for="user_intro_1"> </label>
                            </div>
                        </div>

                        </br>

                        <div class = "container  justify-content-center">
                        <div class = "row">
                        <button type="submit" class="btn btn-dark">저장</button>
                        </form>
                        </div>
                        </div>
      
                        <div class = "container  justify-content-center">
                        <div class = "row">
                          <div class = "col-2  mt-3 mb-3">
                              게시글
                          </div>
      
                          <div class = "col-10 mt-2">
                          <form action="./switch" method="post">
                              <button type="submit" class="btn btn-dark" >게시글 편집</button>
                              <input type="hidden" id="username1_hidden" name="username_hidden" value="1">
                          </form>
                          </div>
      
                        </div>
                        </div>              
                  </div>
                  </div>


            
                  <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab">
                  <form action="./feed/profile2" method="post" enctype="multipart/form-data" >
                  <!--프로필 2번 내용물-->
      
                  <div class = "container justify-content-center mt-3">
                  <div class = "row">
                      <div class="col-4">
                          <img src="../images/profile1.png" alt="Logo" width="120" height="120">
                      </div>
      
                      <div class = "col-8 mt-4">
                          <div class="input-group mb-3">
                              <span class="input-group-text">아이디</span>
                              <div class="form-floating">
                                <input type="text" class="form-control" id="user_id_2" name="user_id_2" placeholder="Username" disabled>
                                <label for="user_id_2">${req.session.loginId}</label>
                              </div>
                            </div>
      
                            <div class="input-group mb-3">
                              <span class="input-group-text">이름</span>
                              <div class="form-floating">
                                <input type="text" class="form-control" id="user_name_2" name="user_name_2" placeholder="Username">
                                <input type="hidden" class="form-control" id="user_name_2_hidden" name="user_name_2_hidden" placeholder="Username">
                                <label for="user_name_2"><p id = "user_name2_label">이게 라벨인가</p></label>
                              </div>
                            </div>
                      </div>
                  </div>
      
                  <div class = "container  justify-content-center mt-3">
                      <div class = "mb-3">소개</div>
                      <div class="form-floating">
                          <textarea class="form-control" placeholder="Leave a comment here" id="user_intro_2" name="user_intro_2"></textarea>
                          <label for="user_intro_2"> </label>
                        </div>
                    </div>


                    </br>

                    <div class = "container  justify-content-center">
                    <div class = "row">
                    <button type="submit" class="btn btn-dark">저장</button>
                    </form>
                    </div>
                    </div>
      
                    <div class = "container  justify-content-center">
                    <div class = "row">
                      <div class = "col-2  mt-3 mb-3">
                          게시글
                      </div>
      
                      <div class = "col-10 mt-2"> 
                      <form action="./switch" method="post">
                      <button type="submit" class="btn btn-dark" >게시글 편집</button>
                      <input type="hidden" id="username2_hidden" name="username_hidden" value="2">
                      </form>
                      </div>
      
                    </div>
                    </div>              
              </div>
      
                  </div>

                 
                  <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab">
                  <form action="./feed/profile3" method="post" enctype="multipart/form-data" >
                  <!--프로필 3번 내용물-->
      
                  <div class = "container justify-content-center mt-3">
                  <div class = "row">
                      <div class="col-4">
                          <img src="../images/profile1.png" alt="Logo" width="120" height="120">
                      </div>
      
                      <div class = "col-8 mt-4">
                          <div class="input-group mb-3">
                              <span class="input-group-text">아이디</span>
                              <div class="form-floating">
                                <input type="text" class="form-control" id="user_id_3" name="user_id_1" placeholder="Username" disabled>
                                <label for="user_id_3">${req.session.loginId}</label>
                              </div>
                            </div>
      
                            <div class="input-group mb-3">
                              <span class="input-group-text">이름</span>
                              <div class="form-floating">
                                <input type="text" class="form-control" id="user_name_3" name="user_name_3" placeholder="Username">
                                <input type="hidden" class="form-control" id="user_name_3_hidden" name="user_name_3_hidden" placeholder="Username">
                                <label for="user_name_3"><p id = "user_name3_label">이게 라벨인가</p></label>
                              </div>
                            </div>
                      </div>
                  </div>
      
                  <div class = "container  justify-content-center mt-3">
                      <div class = "mb-3">소개</div>
                      <div class="form-floating">
                          <textarea class="form-control" placeholder="Leave a comment here" id="user_intro_3" name="user_intro_3"></textarea>
                          <label for="user_intro_3"> </label>
                        </div>
                    </div>

                    </br>

                    <div class = "container  justify-content-center">
                    <div class = "row">
                    <button type="submit" class="btn btn-dark">저장</button>
                    </form>
                    </div>
                    </div>
      
                    <div class = "container  justify-content-center">
                    <div class = "row">
                      <div class = "col-2  mt-3 mb-3">
                          게시글
                      </div>
      
                      <div class = "col-10 mt-2"> 
                      <form action="./switch" method="post">
                      <button type="submit" class="btn btn-dark" >게시글 편집</button>
                      <input type="hidden" id="username3_hidden" name="username_hidden" value="3">
                      </form>
                      </div>

                    </div>
                    </div>              
              </div>
                  
                  </div>
                  
              </form>
      
              </div>
            </div>
          </div>
        </div>
        
   
        
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    </main>

    <!--추가 modal-->
    <!-- 팔로잉 클릭 -->
    <div
      class="modal fade"
      id="modal_following"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">팔로잉</h5>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" onclick="location.reload()" id="following_close"></button>
          </div>
          <div class="modal-body">
          <div id = "following_view">
                1
            </div>
          </div>
          
        </div>
      </div>
    </div>

    <!-- 팔로워 클릭 -->
    <div
      class="modal fade"
      id="modal_follower"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">팔로워</h5>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" onclick="location.reload()" id="follower_close"></button>
          </div>
          <div class="modal-body">
          <div id = "follower_view">
                1
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 게시글 생성 버튼 클릭 -->
    <form action="./feed/write" method="post" enctype="multipart/form-data" >
    <div class="modal fade" id="modal_new_post" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">새 게시글 생성</h5>
          </div>
          <div class="modal-body">
            <h5>게시글 제목</h5>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                aria-describedby="basic-addon1"
                name="title"
                id="title"
                required
              />
            </div>
            <h5>게시글 내용</h5>
            <div class="input-group">
              <textarea
                class="form-control"
                style="height: 250px"
                name="subject"
                id="subject"
                required
              ></textarea>
            </div>
            <br/>
              <input type="file"  class="form-control" id="image" name ="image" accept=".png, .jpeg, .jpg" required>
              <br />
              
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">저장</button>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
</form>
    
    </body>
</html>
        `;

    res.send(output);
  } else {
    res.redirect("/"); //세션에 로그인 아이디가 존재하지 않는 경우 로그인 페이지로 보낸다.
  }

});


router.post("/profile1", upload.single('profile_image'), function (req, res) { //프로필1


  const username = req.body.user_name_1;
  const introduction = req.body.user_intro_1;

  const options = { //user_detail의 username과 introduction을 변경해주는 작업
    url: req.headers.origin + '/api/user_detail/update', 
    method: 'POST',
    form: {
      username1: username ,
      introduction1: introduction,
      id: req.session.loginId,
      username: req.body.user_name_1_hidden
    }
  };

  request.post(options, function(err, httpResponse, body){ 
    if(err) console.log(err);
  });

  const options2 = { //profile의 username1을 수정해주는 작업
    url: req.headers.origin + '/api/profile/update1', 
    method: 'POST',
    form: {
      username1: username ,
      id: req.session.loginId,
      username: req.body.user_name_1_hidden
    }
  };

  request.post(options2, function(err, httpResponse, body){
    if(err) console.log(err);
  });


  const options3 = { //contents의 username을 수정해주는 작업
    url: req.headers.origin + '/api/contents/update_username', 
    method: 'POST',
    form: {
      username1: username ,
      id: req.session.loginId,
      username: req.body.user_name_1_hidden
    }
  };

  request.post(options3, function(err, httpResponse, body){
    if(err) console.log(err);
  });
  
  //여기서부터 다시 작업해야함

  const options4 = { //comments의 username을 수정해주는 작업
    url: req.headers.origin + '/api/comments/update_username', 
    method: 'POST',
    form: {
      username1: username ,
      id: req.session.loginId,
      username: req.body.user_name_1_hidden
    }
  };

  request.post(options4, function(err, httpResponse, body){
    if(err) console.log(err);
  });

  const options5 = { //follower의 username을 수정해주는 작업
    url: req.headers.origin + '/api/follower/update_username', 
    method: 'POST',
    form: {
      username1: username ,
      id: req.session.loginId,
      username: req.body.user_name_1_hidden
    }
  };

  request.post(options5, function(err, httpResponse, body){
    if(err) console.log(err);

    const options52 = { //follower의 username을 수정해주는 작업
      url: req.headers.origin + '/api/follower/update_username2', 
      method: 'POST',
      form: {
        username1: username ,
        id: req.session.loginId,
        username: req.body.user_name_1_hidden
      }
    };
  
    request.post(options52, function(err, httpResponse, body){
      if(err) console.log(err);
    });
  
  });

  const options6 = { //following의 username을 수정해주는 작업
    url: req.headers.origin + '/api/following/update_username', 
    method: 'POST',
    form: {
      username1: username ,
      id: req.session.loginId,
      username: req.body.user_name_1_hidden
    }
  };

  request.post(options6, function(err, httpResponse, body){
    if(err) console.log(err);

    const options62 = { //following의 username을 수정해주는 작업
      url: req.headers.origin + '/api/following/update_username2', 
      method: 'POST',
      form: {
        username1: username ,
        id: req.session.loginId,
        username: req.body.user_name_1_hidden
      }
    };
  
    request.post(options62, function(err, httpResponse, body){
      if(err) console.log(err);
    });
  });


  if(req.session.username == req.body.user_name_1_hidden)
  {
    req.session.username = req.body.user_name_1;

    let options12 = { //following의 username을 수정해주는 작업
      url: req.headers.origin + '/api/user/update_username', 
      method: 'POST',
      form: {
        id: req.session.loginId,
        username: req.body.user_name_1
      }
    };
  
    request.post(options12, function(err, httpResponse, body){
      if(err) console.log(err);
    });
  }


  res.redirect("/feed");
});



router.post("/profile2", upload.single('profile_image'), function (req, res) {

  const username2 = req.body.user_name_2;
  const introduction2 = req.body.user_intro_2;

  let options = { //user_detail의 username과 introduction을 변경해주는 작업
    url: req.headers.origin + '/api/user_detail/update', 
    method: 'POST',
    form: {
      username1: username2 ,
      introduction1: introduction2,
      id: req.session.loginId,
      username: req.body.user_name_2_hidden
    }
  };

  request.post(options, function(err, httpResponse, body){ 
    if(err) console.log(err);
  });

  let options2 = { //profile의 username1을 수정해주는 작업
    url: req.headers.origin + '/api/profile/update2', 
    method: 'POST',
    form: {
      username1: username2 ,
      id: req.session.loginId,
      username: req.body.user_name_2_hidden
    }
  };

  request.post(options2, function(err, httpResponse, body){
    if(err) console.log(err);
  });


  let options3 = { //contents의 username을 수정해주는 작업
    url: req.headers.origin + '/api/contents/update_username', 
    method: 'POST',
    form: {
      username1: username2 ,
      id: req.session.loginId,
      username: req.body.user_name_2_hidden
    }
  };

  request.post(options3, function(err, httpResponse, body){
    if(err) console.log(err);
  });
  
  //여기서부터 다시 작업해야함

  let options4 = { //comments의 username을 수정해주는 작업
    url: req.headers.origin + '/api/comments/update_username', 
    method: 'POST',
    form: {
      username1: username2 ,
      id: req.session.loginId,
      username: req.body.user_name_2_hidden
    }
  };

  request.post(options4, function(err, httpResponse, body){
    if(err) console.log(err);
  });

  let options5 = { //follower의 username을 수정해주는 작업
    url: req.headers.origin + '/api/follower/update_username', 
    method: 'POST',
    form: {
      username1: username2 ,
      id: req.session.loginId,
      username: req.body.user_name_2_hidden
    }
  };

  request.post(options5, function(err, httpResponse, body){
    if(err) console.log(err);

    let options52 = { //follower의 username을 수정해주는 작업
      url: req.headers.origin + '/api/follower/update_username2', 
      method: 'POST',
      form: {
        username1: username2 ,
        id: req.session.loginId,
        username: req.body.user_name_2_hidden
      }
    };
  
    request.post(options52, function(err, httpResponse, body){
      if(err) console.log(err);
    });
  });

  let options6 = { //following의 username을 수정해주는 작업
    url: req.headers.origin + '/api/following/update_username', 
    method: 'POST',
    form: {
      username1: username2 ,
      id: req.session.loginId,
      username: req.body.user_name_2_hidden
    }
  };

  request.post(options6, function(err, httpResponse, body){
    if(err) console.log(err);

    let options62 = { //following의 username을 수정해주는 작업
      url: req.headers.origin + '/api/following/update_username2', 
      method: 'POST',
      form: {
        username1: username2 ,
        id: req.session.loginId,
        username: req.body.user_name_2_hidden
      }
    };
  
    request.post(options62, function(err, httpResponse, body){
      if(err) console.log(err);
    });
  });


  if(req.session.username == req.body.user_name_2_hidden)
  {
    req.session.username = req.body.user_name_2;

    let options12 = { //following의 username을 수정해주는 작업
      url: req.headers.origin + '/api/user/update_username', 
      method: 'POST',
      form: {
        id: req.session.loginId,
        username: req.body.user_name_2
      }
    };
  
    request.post(options12, function(err, httpResponse, body){
      if(err) console.log(err);
    });
  }


  res.redirect("/feed");
});

router.post("/profile3", upload.single('profile_image'), function (req, res) {


  const username3 = req.body.user_name_3;
  const introduction3 = req.body.user_intro_3;

  let options = { //user_detail의 username과 introduction을 변경해주는 작업
    url: req.headers.origin + '/api/user_detail/update', 
    method: 'POST',
    form: {
      username1: username3 ,
      introduction1: introduction3,
      id: req.session.loginId,
      username: req.body.user_name_3_hidden
    }
  };

  request.post(options, function(err, httpResponse, body){ 
    if(err) console.log(err);
  });

  let options2 = { //profile의 username1을 수정해주는 작업
    url: req.headers.origin + '/api/profile/update3', 
    method: 'POST',
    form: {
      username1: username3 ,
      id: req.session.loginId,
      username: req.body.user_name_3_hidden
    }
  };

  request.post(options2, function(err, httpResponse, body){
    if(err) console.log(err);
  });


  let options3 = { //contents의 username을 수정해주는 작업
    url: req.headers.origin + '/api/contents/update_username', 
    method: 'POST',
    form: {
      username1: username3 ,
      id: req.session.loginId,
      username: req.body.user_name_3_hidden
    }
  };

  request.post(options3, function(err, httpResponse, body){
    if(err) console.log(err);
  });
  
  //여기서부터 다시 작업해야함

  let options4 = { //comments의 username을 수정해주는 작업
    url: req.headers.origin + '/api/comments/update_username', 
    method: 'POST',
    form: {
      username1: username3 ,
      id: req.session.loginId,
      username: req.body.user_name_3_hidden
    }
  };

  request.post(options4, function(err, httpResponse, body){
    if(err) console.log(err);
  });

  let options5 = { //follower의 username을 수정해주는 작업
    url: req.headers.origin + '/api/follower/update_username', 
    method: 'POST',
    form: {
      username1: username3 ,
      id: req.session.loginId,
      username: req.body.user_name_3_hidden
    }
  };

  request.post(options5, function(err, httpResponse, body){
    if(err) console.log(err);

    let options52 = { //follower의 username을 수정해주는 작업
      url: req.headers.origin + '/api/follower/update_username2', 
      method: 'POST',
      form: {
        username1: username3 ,
        id: req.session.loginId,
        username: req.body.user_name_3_hidden
      }
    };
  
    request.post(options52, function(err, httpResponse, body){
      if(err) console.log(err);
    });
  });

  let options6 = { //following의 username을 수정해주는 작업
    url: req.headers.origin + '/api/following/update_username', 
    method: 'POST',
    form: {
      username1: username3 ,
      id: req.session.loginId,
      username: req.body.user_name_3_hidden
    }
  };

  request.post(options6, function(err, httpResponse, body){
    if(err) console.log(err);

    let options62 = { //following의 username을 수정해주는 작업
      url: req.headers.origin + '/api/following/update_username2', 
      method: 'POST',
      form: {
        username1: username3 ,
        id: req.session.loginId,
        username: req.body.user_name_3_hidden
      }
    };
  
    request.post(options62, function(err, httpResponse, body){
      if(err) console.log(err);
    });
  });


  if(req.session.username == req.body.user_name_3_hidden)
  {
    req.session.username = req.body.user_name_3;

    let options12 = { //following의 username을 수정해주는 작업
      url: req.headers.origin + '/api/user/update_username', 
      method: 'POST',
      form: {
        id: req.session.loginId,
        username: req.body.user_name_3
      }
    };
  
    request.post(options12, function(err, httpResponse, body){
      if(err) console.log(err);
    });
  }



  res.redirect("/feed");
});

router.post("/write", upload.single('image'),function (req, res, next) { //게시글 작성 버튼을 눌렀을 시

  const title = req.body.title;
  const subject = req.body.subject;

  console.log(req.file.filename);

  const options = {
    url: req.headers.origin + '/api/contents/insert', 
    method: 'POST',
    form: {
      id: req.session.loginId,
      username: req.session.username,
      title: title,
      contents: subject,
      image: req.file.filename //나중에 여기에 png를 붙이면 이미지 정상 출력
    }
  };

  request.post(options, function(err, httpResponse, body){
    if(err) console.log(err);

    const options2 = {
      url: req.headers.origin + '/api/contents/select_insertid', 
      method: 'post',
      form: {
      }
    };
  
    request.post(options2, function(err, httpResponse, body){
      if(err) console.log(err);
  
      const last_id = JSON.parse(body.slice(1, -1));
  
      insert_incre = Object.values(last_id);

      console.log(insert_incre);

      const options3 = {
        url: req.headers.origin + '/api/contents/update_incre', 
        method: 'POST',
        form: {
          incre: insert_incre[0],
          contents_id: insert_incre[0]
        }
      };

      request.post(options3, function(err, httpResponse, body){
        if(err) console.log(err);
      });
    });
  });
  
  res.redirect("/feed");
});

module.exports = router;
