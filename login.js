
function Login() {
   
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'usuario': usuario,
            'senha': senha
        })
    })
    
    .then(response => {
        if (response.ok) {
            window.location.href = 'pages/homepage/homepage.html';
        } else {
            return response.json().then(errorMessage => {
                document.getElementById('error-message').textContent = errorMessage.error; 
            });
        }
    })
}


