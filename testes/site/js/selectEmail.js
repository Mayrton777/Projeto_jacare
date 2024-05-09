//const { response } = require("express");

const tabelaUsuarios = document.getElementById('tabelaUsuarios');
function buscarDadosEmail() {
    const telefone = document.getElementById("telefone").value;
    const id = document.getElementById("id").value;


    console.log(telefone, id, 'akl;sdjaklsdjkl')

    if(telefone.length === 0 || id.length === 0) {
         alert('Passe o ID e o telefone')
         return
    }
    //console.log(telefone, id)
    fetch(`http://localhost:8080/user/${telefone}/${id}`, {
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

        console.log(data.result[0].length)

        if(data.result[0].length === 0){
            alert("Numero ou ID incorreto")
        }
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
    return `${data} ${hora}`;
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
            <td>${usuario.telefone}</td>
            <td>${formatarDataHora(usuario.dt_reserva)}</td>
            <td>${usuario.qtd_pessoas}</td>
            <td>${usuario.obs}</td>`;
        tbody.appendChild(tr);
    });
}

