let list = [];

function searchF() {
  const user_id = document.getElementById("input_user").value;
  let search_list = document.getElementById("div_users");

  const url = window.location.origin + "/api/user_detail/search_user";
  // alert(user_id);

  window.onload = function () {
    list = fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: user_id,
    })
      .then((response) => response.json())
      .then((data) => {
        var output = ``;

        var i = 0;

        while (i < data.length) {
          output =
            output +
            ` <div class="card" style="margin-bottom: 5px">
              <div class="card-body">${data[i].id}
              </div>
            </div>
            `;

          i = i + 1;
        }

        search_list.innerHTML = output;
      });
  };
}
