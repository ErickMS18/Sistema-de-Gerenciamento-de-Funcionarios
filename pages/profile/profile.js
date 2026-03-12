var username;
var email;
var dept;
var hours;
var theme;
var is_admin;

window.onload = async function() {
    var response = await fetch("php/get_user_data.php", {
        method: "GET"
    });

    var user_data = await response.json();

    username = user_data.username;
    email = user_data.user_email;
    dept = user_data.user_dept;
    hours = user_data.user_hours;
    theme = user_data.user_theme;
    is_admin = user_data.user_is_admin;

    console.log("Theme:", theme);

    if (theme == "dark"){ document.getElementById("stylesheet").href = "styles/profile-dark.css" }

    document.getElementById("userdata").innerHTML = `<h1>Informações do usuário</h1>
                                                    Nome: ${username}<br>
                                                    Email: ${email}<br>
                                                    Departamento: ${dept}<br>
                                                    Horas disponíveis: ${hours}<br>`
    if (is_admin){
        document.getElementById("userdata").innerHTML += "<br>(Administrador)";
    }
}

function editUserData(){
    document.getElementById("editButton").remove();

    document.getElementById("userdata").innerHTML = `
    <form id="user_data_form">  
        <label for="name">Nome:</label>
        <input type="text" id="name" name="username" value="${username}"><br><br>
        <label for="email">Email:</label>  
        <input type="text" id="email" name="email" value="${email}"><br><br>
        <label for="dept">Departamento:</label> 
        <input type="text" id="dept" name="dept" value="${dept}"><br><br>
        <label for="hours">Horas disponíveis:</label>  
        <input type="text" id="hours" name="hours" value="${hours}"><br><br>
        <button type="button" class="button1" onclick="updateUserData()">Atualizar</button>
    </form>`;

    // alert("Yipeeeeee")
};

async function updateUserData(){
    var form = document.getElementById("user_data_form");
    var data = new FormData(form);

    var response = await fetch('php/update_data.php', {
        method: 'POST',
        body: data
    });

    if (response.ok) {
        console.log("Data submitted successfully.");
    } else {
        console.error("Error submitting data.");
    }

    location.reload();
}
