/*  var theme = 'dark';

window.onload = function() {

    const savedTheme = sessionStorage.getItem('theme') || 'default';
    setTheme(savedTheme);

};


    // Function to set theme
    function setTheme(theme) {
       
        
        if (theme === 'dark') {
            document.getElementById('theme-style').href = 'dark-theme.css';
        } else {
            document.getElementById('theme-style').href = 'default-theme.css';
        }
    
        
    } */





    function gravar() {
        var name = document.querySelector('.user1');
        var email = document.querySelector('.email1');
        var pass1 = document.querySelector('.password1');
        var pass2 = document.querySelector('.password21');
    
        // Verifica se todos os campos foram preenchidos
        if (!name.value || !email.value || !pass1.value || !pass2.value) {
            alert("Todos os campos não foram preenchidos");
            return; // Interrompe a execução se algum campo estiver vazio
        }
    
        // Verifica se o e-mail é válido
        if (!email.value.includes("@")) {
            alert("Não é um endereço de E-mail válido.");
            return;
        }
    
        // Verifica se as senhas coincidem
        if (pass1.value !== pass2.value) {
            alert("As senhas são diferentes.");
            return;
        }
    
        // Se todas as validações passarem, continua com o envio
        var form = document.getElementById('form-cadastro');
        var dados = new FormData(form);
    
        fetch("php/signup.php", {
            method: "POST",
            body: dados
        });
        alert("Usuário cadastrado com sucesso");
    }
    