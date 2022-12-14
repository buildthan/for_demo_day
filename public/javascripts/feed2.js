let list = [];

window.onload = function () {
  const id = sessionStorage.getItem("id");
  const username = sessionStorage.getItem("username");

  if (id == null) {
    window.location.href = "/home";
  }
  document.getElementById("user_id").innerHTML = id;
  document.getElementById("user_name").innerHTML = username;

  sessionStorage.clear();

  //feed 화면 새로고침될 때마다 팔로워 수, 팔로잉 수 변경되도록 함
  const url_follower_num_update =
    window.location.origin + "/api/follower/update_num2";

  fetch(url_follower_num_update, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      username: username,
    }),
  }).then((response) => response.json());

  const url_following_num_update =
    window.location.origin + "/api/following/update_num2";

  fetch(url_following_num_update, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      username: username,
    }),
  }).then((response) => response.json());
  //여기까지 팔로워 수, 팔로잉 수 업데이트 코드

  //팔로우 버튼 관련
  let follow_btn_view = document.getElementById("follow_btn_seat");
  const url_follow_btn = window.location.origin + "/api/following/follow_check";

  fetch(url_follow_btn, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      username: username,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data == "") {
        var output = ``;
        output += `<button type="button" class="btn btn-dark" id="${id}" onclick="add_following(this.id, '${username}')">
          팔로우
        </button>`;
      } else {
        var output = ``;

        output += `<button type="button" class="btn btn-dark" id="${id}" onclick="following_delete(this.id, '${username}')">
          언팔로우
        </button>`;
      }

      follow_btn_view.innerHTML = output;
    });

  let contents_list = document.getElementById("contents");
  let contests_num = document.getElementById("contents_num");

  const url = window.location.origin + "/api/contents/show_contents";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      username: username,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      var output = ``;

      output += `<div class="row p-1">`;

      var i = 0;

      contests_num.innerText = data.length;

      while (i < data.length) {
        if (i % 2 == 0) {
          output += `<div class="row p-1">`;
        }

        output =
          output +
          `<div class="col-6 card p-1 context" data-toggle="modal" data-target="#contentModal${data[i].contents_id}">
              <div class="card-body" id="${i}" style="cursor: pointer">

              <h5 class="card-title">${data[i].title}</h5>
              <p class="card-text"></p>
              </div></div>
              
                        <!-- Modal -->
                        <div class="modal fade" id="contentModal${data[i].contents_id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="exampleModalLabel">${data[i].username}</h5>
                                </div>
                                <div class="modal-body">`;


                                if(data[i].image)
                                {
                                  output+=`
                                  <div class="d-flex justify-content-center">
                                  <div class="align-self-center">
                                  <img src="../uploads/${data[i].image}" alt="#" width="400">
                                  </div>
                                  </div>
                                  `;
                                }
                        


                  output+=      `
                                  <h5>${data[i].title}</h5>
                                  <p>${data[i].contents}</p>
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-dismiss="modal"> 닫기 </button>
                                </div>
                              </div>
                            </div>
                          </div>
                       
              `;

        if (i % 2 == 1) {
          output += `</div>`;
        }

        i = i + 1;
      }

      output += `</div>`;

      contents_list.innerHTML = output;
    });

  const url_4 = window.location.origin + "/api/user_detail/check_follow";

  let follower_num = document.getElementById("follower_num");
  let following_num = document.getElementById("following_num");
  let current_introduction = document.getElementById("instruction");

  fetch(url_4, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      username: username,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      follower_num.innerText = data[0].follower_num;
      following_num.innerText = data[0].following_num;
      current_introduction.innerText = data[0].introduction;
    });

  // 팔로워 클릭했을 때 팔로워 읽어오는 코드
  const url_follower = window.location.origin + "/api/follower";
  let follower_list = document.getElementById("follower_view");

  fetch(url_follower, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      username: username,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var output = ``;

      var i = 0;
      while (i < data.length) {
        output =
          output +
          ` <div class="card" style="margin-bottom: 5px">
                <div class="card-body">${data[i].follower_id}
                  
                </div>
              </div>
              `;

        i = i + 1;
      }

      follower_list.innerHTML = output;
    });

  // 팔로잉 클릭했을 때 팔로잉 읽어오는 코드
  const url_following = window.location.origin + "/api/following";
  let following_list = document.getElementById("following_view");

  list = fetch(url_following, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      username: username,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var output = ``;

      var i = 0;

      while (i < data.length) {
        output =
          output +
          ` <div class="card" style="margin-bottom: 5px">
                <div class="card-body">
                ${data[i].following_id}
                  <button type="button" class="btn btn-outline-dark" id="${i}" style="float: right" onclick="following_delete(this.id)">삭제</button>

                
                </div>
              </div>
              `;

        i = i + 1;
      }

      following_list.innerHTML = output;
    });
};

function Contents_update(id) {
  console.log(id);
  // 본인 게시글 클릭했을 때 해당 게시글 읽어오는 코드
  const url_contentsdetail =
    window.location.origin + "/api/contents/show_contents";
  let post_subject = document.getElementById("post_subject");
  let post_detail = document.getElementById("post_detail");

  fetch(url_contentsdetail)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      post_subject.value = data[id].title;
      post_detail.value = data[id].contents;
      let content_id = data[id].contents_id;
    });
}

window.addEventListener("beforeunload", (event) => {
  // 명세에 따라 preventDefault는 호출해야하며, 기본 동작을 방지합니다.
  const id = document.getElementById("user_id").innerHTML;
  const username = document.getElementById("user_name").innerHTML;

  sessionStorage.setItem("id", id);
  sessionStorage.setItem("username", username);

  event.preventDefault();
});

function searchF() {
  let input_user = document.getElementById("input_user").value;
  const url_search = window.location.origin + "/api/user_detail/search_user";
  let search_view = document.getElementById("div_users");

  const res = fetch(url_search, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      search_user: input_user,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      var output = ``;

      var i = 0;

      while (i < data.length) {
        output =
          output +
          ` <div class="card" style="margin-bottom: 5px">
              <div class="card-body" id="${data[i].id}_${data[i].username}" onclick='move(this.id)'>${data[i].username}
                
              </div>
            </div>
            `;

        i = i + 1;
      }

      search_view.innerHTML = output;
    });
}

function move(data) {
  const id = data.split("_")[0];
  const username = data.split("_")[1];

  sessionStorage.setItem("id", id);
  sessionStorage.setItem("username", username);

  window.location.href = "/feed2";
}

function add_following(id, username) {
  const url_following = window.location.origin + "/api/following/insert";

  const res2 = fetch(url_following, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      following_id: id,
      following_username: username,
    }),
  }).then((response) => response.json());

  location.reload();
}

//팔로잉 삭제
function following_delete(id, username) {
  const delete_id = String(id);
  const delete_username = String(username);

  const url = window.location.origin + "/api/following/delete";
  const res1 = fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      following_id: delete_id,
      following_username: delete_username,
    }),
  }).then((response) => response.json());

  location.reload();
}
