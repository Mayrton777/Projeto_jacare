// Função para enviar o formulário
async function enviarFormulario() {
    const formulario = document.getElementById("reserva");
    const formData = new FormData(formulario);
    const jsonData = {};

    formData.forEach((valuer, key) => {
        jsonData[key] = valuer;
    });

    const apiUrl = 'http://localhost:8080/user';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('API response:', data);
        // You can add further handling of the API response here
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Adiciona um ouvinte de evento ao botão "Enviar"
document.getElementById('enviar').addEventListener('click', function(event) {
    enviarFormulario(); // Chama a função enviarFormulario() quando o botão é clicado
    // Limpa todos os event listeners associados ao botão "Enviar"
    document.getElementById('enviar').removeEventListener('click', this);
    event.preventDefault(); // Evita o comportamento padrão do botão
});