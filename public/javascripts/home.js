let contents = [];
let time = [];

window.onload = function(){
    const url = window.location.origin + '/api/following/getData';

    const res = fetch(url)
    .then((response) => response.json())
    .then(data => setFollowing(data));
};

function get(data, num){
    const url = window.location.origin + '/api/contents/show_contents';

    return new Promise((resolve, reject) => {
     
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                id: data[num].following_id,
                username: data[num].following_username
            }),
        }).then((response) => response.json())
        .then(data => {
            console.log(data);
            SaveContents(data);
            resolve(data);
        });
        
    });
}

async function setFollowing(data){

   for(let i = 0; i < data.length ; i++){
        await get(data, i); 
    }

    if(time.length > 1){
        time.sort(sortFunction);
    }
    
    let contents_block = document.getElementById('contents');
    let output = '';

    for(let i = 0; i < time.length; i ++){
        
        for(let j = 0; j < contents[time[i]].length; j++){
            
            output += `<div class="card post_box" id="${contents[time[i]][j].contents_id}_${contents[time[i]][j].timestamp}"
            data-toggle="modal" data-target="#contentModal${contents[time[i]][j].contents_id}" onclick="setComments(this.id)">
                            <div class="card-header">
                                <div id="profile_circle"></div>
                                <h5 id="post_username">${contents[time[i]][j].username}</h5>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${contents[time[i]][j].title}</h5>
                            </div>
                        </div>
                        <!-- Modal -->
                        <div class="modal fade" id="contentModal${contents[time[i]][j].contents_id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">${contents[time[i]][j].username}</h5>
                                </div>
                                <div class="modal-body">`;


                                if(contents[time[i]][j].image)
                                {
                                  output+=`
                                  <div class="d-flex justify-content-center">
                                  <img src="../uploads/${contents[time[i]][j].image}" alt="#" width="400">
                                  </div>
                                  `;
                                }
                        


                  output+=      `
                                <h5>${contents[time[i]][j].title}</h5>
                                <p>${contents[time[i]][j].contents}</p>
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#commentModal${contents[time[i]][j].contents_id}" data-dismiss="modal">댓글</button>
                                <button type="button" class="btn btn-secondary" onclick='deleteComment(${contents[time[i]][j].contents_id})' data-dismiss="modal"> 닫기 </button>
                                </div>
                            </div>
                            </div>
                        </div>`;
        }
    }
   
    contents_block.innerHTML = output;
}

function sortFunction(a, b){
    let yearA = b.getFullYear();
    let yearB = a.getFullYear();

    if(yearA > yearB) return 1;
    else if(yearA == yearB){
        let monthA = b.getMonth();
        let monthB = a.getMonth();

        if(monthA > monthB) return 1;
        else if (monthA == monthB){
            let dateA = b.getDate();
            let dataB = a.getDate();

            if(dateA > dataB) return 1;
            else if(dateA == dataB){
                let hourA = b.getHours();
                let hourB = a.getHours();

                if(hourA > hourB) return 1;
                else if(hourA == hourB){
                    let minA = b.getMinutes();
                    let minB = a.getMinutes();

                    if(minA > minB) return 1;
                    else if(minA == minB){
                        let secA = b.getSeconds();
                        let secB = a.getSeconds();

                        if(secA > secB) return 1;
                        else return -1;
                    }
                    else return -1;
                }
                else return -1;
            }
            else return -1;
        }
        else return -1;
    }
    else return -1;
}
function SaveContents(data){
    
    for(let i = 0; i < data.length ; i++){
        time.push(new Date(data[i].timestamp));
    
        if(data[i].timestamp in contents){
            contents[new Date(data[i].timestamp)].push(data[i]);
        }

        else{
            contents[new Date(data[i].timestamp)] = [data[i]];
        }
    }
}

function setComments(data){

    const url = window.location.origin + '/api/comments/getData';
    const contents_id = data.split('_')[0];
    const timestamp = data.split('_')[1];

    
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            id: contents_id,
        }),
    }).then((response) => response.json())
    .then(data2 => ShowComments(data2, contents_id, timestamp));
}

function ShowComments(data, contents_id, time){
   
    let contents_block = document.getElementById('contents');
    let output = contents_block.innerHTML;
    let timestamp = new Date(time);
    let contents_data;
    
   for(let i = 0; i < contents[timestamp].length; i ++){
        if(contents[timestamp][i].contents_id == contents_id){
            contents_data = contents[timestamp][i];
        }
    }
   
    output += `
            <div class="modal fade" id="commentModal${contents_id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${contents_data.username} : ${contents_data.title}</h5>
                    </div>
                    <div class="modal-body" id='main-body'>`;
    
    if( data.length != 0){
        for(let i = 0; i < data.length ; i ++){
            output += ` <p><b>${data[i].username}: </b>${data[i].contents} </p>`;
        }
    }
    else{
        output += ` <p id='none'><b>댓글이 존재하지 않습니다.</b></p>`;
    }
                  
    output += `</div>
                    <div class="modal-footer">
                    
                    <input type="text" class="form-control" id="new_comments" placeholder='여기에 입력해주세요'/>
                    
                    <button type="button" class="btn btn-dark" onclick="WriteComments('${contents_id}', '${time}')"
                    >등록</button>
                
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#contentModal${contents_id}" 
                    data-dismiss="modal"> 뒤로 </button>
            
                    <button type="button" class="btn btn-secondary" onclick='deleteComment(${contents_id})' data-dismiss="modal"> 
                    닫기 </button>
                       
                </div>
            </div>`;
    
    
    contents_block.innerHTML = output;
}

function deleteComment(num){
    const commentModalID = 'commentModal' + num;
    const div = document.getElementById(commentModalID);

    div.remove();
}

function WriteComments(contents_id, timestamp){
   
    let comments = document.getElementById('new_comments');
    const comments_value = comments.value;

    const url = window.location.origin + '/api/comments/setData';

    if(comments_value.length == 0){
        alert('댓글을 입력해주세요.');
        return;
    }

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            id: contents_id,
            contents: comments_value
        }),
    }).then((response) => response.json())
    .then(data => newComments(data));

    comments.value = "";
}

function newComments(data){
    const id = data[1];
    const username = data[2];
    const contents = data[3];

    let contents_block = document.getElementById('main-body');

    if(contents_block.innerText == '댓글이 존재하지 않습니다.'){
        const div = document.getElementById('none');

        div.remove();
    }
   
    $('#main-body').prepend(`<p><b>${username}: </b>${contents} </p>`);
}

