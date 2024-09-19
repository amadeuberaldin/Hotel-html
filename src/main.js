if (window.location.pathname.endsWith('index.html')) {
    const form = document.getElementById('form-reserva');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const dataCheckin = document.getElementById('dataCheckin').value;
            const dataCheckout = document.getElementById('dataCheckout').value;

            const reserva = {
                nome: nome,
                email: email,
                dataCheckin: dataCheckin,
                dataCheckout: dataCheckout
            };

            fetch('http://localhost:3000/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reserva)
            })
                .then(response => response.json())
                .then(data => {
                    alert('Reserva enviada com sucesso!');
                    document.getElementById('form-reserva').reset();
                })
                .catch(error => {
                    console.error('Erro ao enviar a reserva:', error);
                });
        });
    }
}

// Função para carregar reservas e exibi-las na tabela
function carregarReservas() {
    fetch('http://localhost:3000/reservas')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar reservas');
            }
            return response.json();
        })
        .then(reservas => {
            const tabela = document.getElementById('reservas-tabela').getElementsByTagName('tbody')[0];
            tabela.innerHTML = ''; // Limpar a tabela antes de carregar
            reservas.forEach(reserva => {
                const linha = tabela.insertRow();
                linha.insertCell(0).textContent = reserva.nome;
                linha.insertCell(1).textContent = reserva.email;
                linha.insertCell(2).textContent = reserva.dataCheckin;
                linha.insertCell(3).textContent = reserva.dataCheckout;
            });
        })
        .catch(error => {
            console.error('Erro ao carregar as reservas:', error);
        });
}

// Carregar reservas se estivermos na página reservas.html
document.addEventListener('DOMContentLoaded', function () {
    carregarReservas();
});
