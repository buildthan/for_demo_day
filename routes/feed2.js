const express = require("express");
const fs = require("fs");
const request = require("request");

const router = express.Router();

const multer = require("multer");


var upload = multer({dest: 'public/uploads/'});

router.get("/", function (req, res) {
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

    <script src="/javascripts/feed2.js"></script>
    
    
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
                          <p id = "user_id"> </p>`;

  output += `<p id = "user_name"> </p>

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

                          <div id="follow_btn_seat">1</div>
      
                  </div>
                  <div class='m-2'></div>
                <hr>
            
            <div id = "contents">    
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
              />
            </div>

            <h5>게시글 내용</h5>
            <div class="input-group">
              <textarea
                class="form-control"
                style="height: 250px"
                name="subject"
                id="subject"
              ></textarea>
            </div>
            <br/>
            <input type="file"  class="form-control" name ="image" >

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
});

module.exports = router;
