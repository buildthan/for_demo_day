let summit_Active = [0, 0];

function check_ID(){
    const id = document.getElementById('id').value;

    if(id == ""){
        alert('아이디를 입력해주세요.');
        return;
    }

    const url = window.location.origin + '/api/user/checkDB';
    const res = fetch(url, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            id: id
        }),
    }).then((response) => response.json())
    .then(data => check_DB(data[0]));
}

function check_DB(id){
    const ID_result = document.getElementById('ID_result');

    if(id == null){
        ID_result.innerText = "사용 가능한 아이디입니다.";
        summit_Active[0] = 1;
        btnActive();
    }

    else{
        alert('이미 존재하는 아이디입니다. 다른 아이디를 입력해주세요.');
        summit_Active[0] = 0;
    }
}

function btnActive(){
    const btn = document.getElementById('summitbtn');

    if(summit_Active[0] + summit_Active[1] == 2){
        btn.disabled = false;
    }
}

function check_Password(){
    const password = document.getElementById('make_password').value;
    const check_password = document.getElementById('check_password').value;

    const password_result = document.getElementById('password_result');

    if (password == ""){
        alert('비밀번호를 입력해주세요');
        return;
    }

    else if( password == check_password){
        password_result.innerText = "Password가 서로 일치합니다.";

        summit_Active[1] = 1;
        btnActive();
    }

    else{
        password_result.innerText = "Password가 서로 일치하지 않습니다.";
        summit_Active[1] = 0;
    }
}

function is_blank(){
    const nickname = document.getElementById('nickname').value;
    const nickname2 = document.getElementById('nickname2').value;
    const nickname3 = document.getElementById('nickname3').value;

    if(nickname == "" || nickname2 == "" || nickname3 == ""){
    if(nickname == ""){
        alert('username1을 입력하세요');
        return false;
    }else if(nickname2 == ""){
        alert('username2를 입력하세요');
        return false;
    }else if(nickname3 == ""){
        alert('username3을 입력하세요');
        return false;
    }
    }
    else return true;
}

window.onload = function(){
    const btn = document.getElementById('summitbtn');
    btn.disabled = true;
};