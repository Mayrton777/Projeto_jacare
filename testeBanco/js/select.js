async function enviarFormulario() {
    try {
        const response = await fetch("http://localhost:8080/user", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('API response:', data);

        exibirUsuarios(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


// Função para exibir os usuários em uma tabela HTML
function exibirUsuarios(usuario) {
    const tabelaUsuarios = document.getElementById('tabelaUsuarios');
    const tbody = tabelaUsuarios.querySelector('tbody');

    // Limpa o conteúdo atual da tabela
    tbody.innerHTML = '';

    // Itera sobre os usuários e cria uma linha na tabela para cada um
    usuario.forEach(usuario => {
        const tr = document.createElement('tr');
        tr.innerHTML = 
            `<td>${usuario.id_user}</td>
            <td>${usuario.first_name}</td>
            <td>${usuario.last_name}</td>
            <td>${usuario.email}</td>
            <td>${usuario.phone}</td>`;
        tbody.appendChild(tr);
    });

    // Exibe a tabela
    tabelaUsuarios.style.display = 'block';
}

// Adiciona um ouvinte de evento ao botão "Enviar"
document.getElementById('enviar').addEventListener('click', function(event) {
    enviarFormulario(); // Chama a função enviarFormulario() quando o botão é clicado
    event.preventDefault(); // Evita o comportamento padrão do botão
});