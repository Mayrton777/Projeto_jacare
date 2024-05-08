const tabelaUsuarios = document.getElementById('tabelaUsuarios');
function buscarDadosEmail() {
    const email = document.getElementById("email").value;
    fetch(`http://localhost:8080/user/${email}`, {
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

function formatarDataHora(dt_reserva) {
    const dataHora = new Date(dt_reserva);
    const hora = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const data = dataHora.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return `${hora} ${data}`;
}

function exibirUsuarios(usuarios) {
    const tbody = tabelaUsuarios.querySelector('tbody');
    // Limpa o conteúdo atual da tabela
    tbody.innerHTML = '';

    // Itera sobre os usuários e cria uma linha na tabela para cada um
    usuarios.result[0].forEach(usuario => {
        const tr = document.createElement('tr');
        tr.innerHTML = 
            `<td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${formatarDataHora(usuario.dt_reserva)}</td>
            <td>${usuario.qtd_pessoas}</td>
            <td>${usuario.obs}</td>`;
        tbody.appendChild(tr);
    });
}

