const tabelaUsuarios = document.getElementById('tabelaUsuarios');
function buscarDados() {
    const email = document.getElementById("email");
    fetch('http://localhost:8080/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar dados');
        }
        return response.json();
    })
    .then(data => {
        console.log('Resposta do servidor:', data);
        exibirUsuarios(data); // Chama a função exibirUsuarios com os dados recebidos
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

function exibirUsuarios(usuarios) {
    const tbody = tabelaUsuarios.querySelector('tbody');
    console.log(usuarios, "sdfsdf")
    // Limpa o conteúdo atual da tabela
    tbody.innerHTML = '';

    // Itera sobre os usuários e cria uma linha na tabela para cada um
    usuarios.result[0].forEach(usuario => {
        const tr = document.createElement('tr');
        tr.innerHTML = 
            `<td>${usuario.id}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.dt_reserva}</td>
            <td>${usuario.qtd_pessoas}</td>`;
        tbody.appendChild(tr);
    });
}

document.getElementById('enviar').addEventListener('click', function(event){
    buscarDados();
    event.preventDefault();
});
