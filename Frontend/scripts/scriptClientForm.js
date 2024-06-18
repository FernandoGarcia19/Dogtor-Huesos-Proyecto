document.getElementById('clientForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const ci = document.getElementById('ci').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    const data = {
        ci: ci,
        name: name,
        email: email,
        phone: phone,
        address: address
    };

    try {
        const response = await fetch('http://localhost:3000/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('message').textContent = 'Cliente registrado con éxito';
            document.getElementById('message').style.color = 'green';
            document.getElementById('clientForm').reset();
        } else {
            document.getElementById('message').textContent = 'Error al registrar el cliente: ' + result.error;
            document.getElementById('message').style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Error en la solicitud: ' + error.message;
        document.getElementById('message').style.color = 'red';
    }
});
