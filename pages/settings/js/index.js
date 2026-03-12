var tipo;
var current_theme;


window.onload = async function() {

    var response = await fetch("php/get_user_data.php", {
        method: "GET"
    });

    var user_data = await response.json();

    current_theme = user_data.user_theme;


    // const savedTheme = sessionStorage.getItem('theme') || 'default';
    setTheme(current_theme);
};


    function setTheme(theme) {
        var themeStyle = document.getElementById('theme-style');
        
        if (theme === 'dark') {
            themeStyle.href = 'dark-theme.css';
        } else {
            themeStyle.href = 'default-theme.css';
        }
    
        // sessionStorage.setItem('theme', theme);
    }


function salvar(tipo) {
   
    current_theme = tipo;
    console.log("Current theme: ", current_theme);
    if (current_theme === 'dark'){
        document.getElementById('dark').style = "background-color:#2d015c";
        document.getElementById('light').style = "background-color:#59015c";
    } else {
        document.getElementById('light').style = "background-color:#360d9f";
        document.getElementById('dark').style = "background-color:#a827fd";
    }
    
    setTheme(current_theme);
    //envia pro session//
    


}

 async function enviar(){
    
    console.log("Sending theme: ", current_theme);
    fetch("php/sett.php",{
        method: "POST",
        body: JSON.stringify({ theme: current_theme }) 
    });

    alert("Tema salvo com sucesso!");
}
