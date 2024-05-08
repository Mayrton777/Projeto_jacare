function enviarDados() {
    const formulario = document.getElementById("meuFormulario");
    const formData = new FormData(formulario);
    const jsonData = {};

    const nome = document.getElementById("nome").value;

    const email = document.getElementById("email").value;

    const dt_reserva = document.getElementById("dt_reserva").value;

    const qtd_pessoas = document.getElementById("qtd_pessoas").value;

    const obs = document.getElementById("obs").value;

    const obj = {
        nome,
        email,
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
        // Aqui você pode lidar com a resposta do backend, se necessário
        console.log('Resposta do servidor:', data);
        alert(data.message)
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

document.getElementById('enviar').addEventListener('click', function(event){
    enviarDados();
    event.preventDefault();
});
