function enviarDados() {
    const formulario = document.getElementById("meuFormulario");
    const formData = new FormData(formulario);
    const jsonData = {};

    const nome = document.getElementById("nome").value;

    const telefone = document.getElementById("telefone").value;

    const dt_reserva = document.getElementById("dt_reserva").value;

    const qtd_pessoas = document.getElementById("qtd_pessoas").value;

    const obs = document.getElementById("obs").value;

    const obj = {
        nome,
        telefone,
        dt_reserva,
        qtd_pessoas,
        obs
    }

    console.log(obj)

    formData.forEach((value, key) => {
        jsonData[key] = value;
    });


    fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar dados');
        }
        return response.json();
    })
    .then(data => {
        console.log('Resposta do servidor (1ª requisição):', data.message[0][0]);
        return fetch('http://localhost:3002/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.message[0][0])
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar dados na segunda requisição');
        }
        return response.json();
    })
    .then(data => {
        // Aqui você pode lidar com a resposta do backend da segunda requisição, se necessário
        console.log('Resposta do servidor (2ª requisição):', data);
        alert(data.message);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}



document.getElementById('enviar').addEventListener('click', function(event){
    enviarDados();
    event.preventDefault();
});
