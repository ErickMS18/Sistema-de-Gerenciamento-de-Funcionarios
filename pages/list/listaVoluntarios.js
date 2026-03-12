window.onload = async function() {
    try {
        const response = await fetch('listaVoluntarios.php'); 
        
        if (!response.ok) {
            throw new Error('Erro na resposta da rede');
        }
        
        const usuarios = await response.json(); 

        console.log('Dados recebidos:', usuarios);

        const table = document.getElementById('tabelaUsu'); 

        if (!Array.isArray(usuarios)) {
            throw new Error('A resposta não é um array.');
        }

        usuarios.forEach(usuario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuario.name}</td>
                <td>${usuario.email}</td>
                <td>${usuario.department}</td>
                <td>${usuario.hours}</td>
            `;
            table.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
    }

    try {
        const response = await fetch('get-user-data.php'); 
        
        if (!response.ok) {
            throw new Error('Erro na resposta da rede');
        }
        
        var user_data = await response.json();
        console.log("user data: ", user_data); 
        var theme = user_data.user_theme;

        console.log('Dados recebidos:', user_data);

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }

    console.log("Theme:", theme);

    if (theme == "dark"){ document.getElementById("stylesheet").href = "listaVoluntarios-dark.css" }
    
}
