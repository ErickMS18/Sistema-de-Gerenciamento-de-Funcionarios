var username;
var user_id;
var theme;
var page;

window.onload = async function() {

    // Get username
    var usernameResponse = await fetch("php/get_user.php", {
        method: "GET"
    });
    var usernameData = await usernameResponse.json();
    username = usernameData.username;
    user_id = usernameData.user_id;
    user_is_admin = usernameData.user_is_admin;
    theme = usernameData.user_theme;

    console.log("Username:", username);
    console.log("Is admin:", user_is_admin);
    console.log("Theme:", theme);

    if (theme == "dark"){ document.getElementById("stylesheet").href = "styles/homepage-dark.css" }

    document.getElementById("page_body").innerHTML += `<div class="loose_text"><h1>Bem-vindo, ${username}!</h1></div>`

    if (user_is_admin){
        document.getElementById("page_body").innerHTML += `<br>
            <button type="button" class="button1" id="postButton" onclick="createPost()">
            Criar novo post</button>`

    }

    // Get message board data
    var postDataResponse = await fetch("php/connect.php", {
        method: "GET"
    });

    var post_data = await postDataResponse.json();
    console.log(post_data);
    console.log(post_data.length);

    // Fill message board
    if (post_data.length > 0)
    {
        var post_id = 0;

        for (var i = post_data.length - 1; i >= 0; i--){

            if (post_data[i].id_post != post_id) {

                post_id = post_data[i].id_post;

                var post_author = post_data[i].post_author;
                var post_datetime = post_data[i].post_time;
                var post_body = post_data[i].post_body;

                document.getElementById("page_body").innerHTML += `

                    <div class="message_board" id="post_${post_id}">
                        <div class="message" id="message">    
                            <h4>${post_author} - ${post_datetime}</h4>${post_body}                
                        </div>
                        <div class="comment_field" id="comment_field_${post_id}">
                            <textarea id="commentBox_${post_id}" placeholder="Escreva um comentário..." rows="5" cols="75"></textarea>
                            <button type="button" class="button2" onclick="comment(${post_id})">Enviar</button>
                        </div>
                        <h1>Comentários</h1>
                        <div class="comment_list" id="comment_list_${post_id}">
                        </div>
                    </div>`
                if (post_author == username){
                    document.getElementById(`post_${post_id}`).innerHTML += `
                    <button type="button" class="button1" id="deletePostButton" onclick="deletePost('post', ${post_id})">Apagar post</button>
                    <br>`;
                }
            }

            if (post_data[i].comment_author){
                var comment_id = post_data[i].id_comment;
                var comment_author = post_data[i].comment_author;
                var comment_datetime = post_data[i].comment_time;
                var comment_body = post_data[i].comment_body;

                document.getElementById(`comment_list_${post_id}`).innerHTML += `
                    <div class="comment" id="comment_${comment_id}">
                        <h4>${comment_author} - ${comment_datetime}</h4>${comment_body}
                    </div>`

                if (comment_author == username){
                    document.getElementById(`comment_${comment_id}`).innerHTML += `<br><br>
                    <button type="button" class="button1" id="deletePostButton" onclick="deletePost('comment', ${comment_id})">
                        Apagar comentário</button>
                    <br>`;
                }

            } else {
                document.getElementById(`comment_list_${post_id}`).innerHTML += `
                    <div class="comment" id="comment">Nenhum comentário ainda</div>`;
            }
            
        }
    } else {
        document.getElementById("page_body").innerHTML = `

                    <div class="message_board" id="post_${post_id}">
                        <div class="message" id="message">    
                            Nenhum post ainda                
                        </div
                    </div>`
    }

};

function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

async function comment(post_id){

    var comment_box = document.getElementById(`commentBox_${post_id}`);
    var comment_text = comment_box.value;

    if (comment_text == "") {
        if (!(document.getElementById("warning_comment"))){
            document.getElementById(`comment_field_${post_id}`).innerHTML += `
            <div id="warning_comment">
                <h4 style="color:red">Digite um comentário</h4>
            </div>`;
        }

    } else {

        if (document.getElementById(`comment_field_${post_id}`).innerHTML.includes("Digite um comentário")){
            document.getElementById("warning_comment").remove();
        }

        var comment_time = getCurrentDateTime();
        console.log(`User comment for post ${post_id}:`, comment_text);
        console.log(`Comment time: ${comment_time}`);
    
        var data = {
            post_id: post_id,
            comment: comment_text,
            username: username,
            user_id: user_id,
            comment_time: comment_time
        };
    
        var response = await fetch('php/save_comment.php', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    
        if (response.ok) {
            console.log("Comment submitted successfully.");
            comment_box.value = '';
        } else {
            console.error("Error submitting comment.");
        }
    
        if (document.getElementById(`comment_list_${post_id}`).innerHTML.includes("Nenhum comentário ainda")){
            document.getElementById(`comment_list_${post_id}`).innerHTML = "";
        }
    
        // document.getElementById(`comment_list_${post_id}`).innerHTML += `
        //             <div class="comment" id="comment">
        //                 <h4>${username} - ${comment_time}</h4>${comment_text}
        //             </div>`;

        location.reload(); 
    
    }
    
    // alert("If only life were so simple")
};

function createPost(){

    document.getElementById("postButton").remove();

    page = document.getElementById("page_body").innerHTML;

    // document.getElementById("postButton").innerHTML = "";

    document.getElementById("page_body").innerHTML = `
        <div class="message_board">
            <div class="comment_field" id="new_post">
                <textarea id="postBox" placeholder="Escreva um post..." rows="5" cols="75"></textarea>
                <button type="button" class="button2" onclick="submitPost()">Enviar</button>
            </div>
        </div>`;

    document.getElementById("page_body").innerHTML += page;
};

async function submitPost(){

    var post_box = document.getElementById("postBox");
    var post_text = post_box.value;

    if (post_text == "") {
        if (!(document.getElementById("warning_post"))){
            document.getElementById("new_post").innerHTML += `
            <div id="warning_post">
                <h4 style="color:red">Digite um post</h4>
            </div>`;
        }

    } else {

        if (document.getElementById("new_post").innerHTML.includes("Digite um post")){
            document.getElementById("warning_post").remove();
        }

        var post_time = getCurrentDateTime();
        console.log("User post:", post_text);
        console.log(`Post time: ${post_time}`);
    
        var data = {
            post_body: post_text,
            username: username,
            user_id: user_id,
            post_time: post_time
        };    
    
        var response = await fetch('php/save_comment.php', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    
        if (response.ok) {
            console.log("Post submitted successfully.");
            post_box.value = '';
        } else {
            console.error("Error submitting post.");
        };
    
        // document.getElementById("page_body").innerHTML = "<h4>Post submitted!</h4>";
        // document.getElementById("page_body").innerHTML += `
        //                 <div class="message_board">
        //                     <div class="message" id="message">    
        //                         <h4>${username} - ${post_time}</h4>${post_text}                
        //                     </div>
        //                     <h1>Comments</h1>
        //                     <div class="comment_list">
        //                         <div class="comment" id="comment">No comments yet</div>
        //                     </div>
        //                 </div>`;
        
        // document.getElementById("page_body").innerHTML += page;

        location.reload(); 

    }
  
};

async function deletePost(type, id){
    if (type == "post"){

        console.log("Deleting post...")

        var data = {
            post_id: id
        };
    
        var response = await fetch('php/delete_post.php', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log("Post deleted successfully.");
        } else {
            console.error("Error deleting post.");
        };

        // document.getElementById(`post_${id}`).remove;

    } else {

        console.log("Deleting comment...")

        var data = {
            comment_id: id
        };
    
        var response = await fetch('php/delete_post.php', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log("Comment deleted successfully.");
        } else {
            console.error("Error deleting comment.");
        };

        // document.getElementById(`comment_${id}`).remove;

    }

    location.reload(); 

};