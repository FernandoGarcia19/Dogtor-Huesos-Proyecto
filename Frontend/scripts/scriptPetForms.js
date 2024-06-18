document.getElementById('clientForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const ci = document.getElementById('ci').value;
    const namePet = document.getElementById('namePet').value;
    const species = document.getElementById('species').value;
    const weight = document.getElementById('weight').value;
    const age = document.getElementById('age').value;
    const size = document.getElementById('size').value;

    try {
        const clientResponse = await fetch(`http://localhost:3000/clients/ci/${ci}`);
        if (!clientResponse.ok) {
            throw new Error('Network response was not ok ' + clientResponse.statusText);
        }
        const clientData = await clientResponse.json();
        if (!clientData || !clientData._id) {
            throw new Error('Cliente no encontrado');
        }
        const clientId = clientData._id;

        const petData = {
            idClient: clientId,
            namePet: namePet,
            species: species,
            weight: weight,
            age: age,
            size: size
        };
        const petResponse = await fetch('http://localhost:3000/pets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(petData)
        });
        if (petResponse.ok) {
            document.getElementById('message').textContent = 'Mascota registrada con exito';
            document.getElementById('message').style.color = 'green';
            document.getElementById('clientForm').reset();
        } else {
            const result = await petResponse.json();
            document.getElementById('message').textContent = 'Error al registrar la mascota: ' + result.error;
            document.getElementById('message').style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Error en la solicitud: ' + error.message;
        document.getElementById('message').style.color = 'red';
    }
});
