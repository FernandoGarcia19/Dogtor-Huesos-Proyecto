document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const ci = document.getElementById('ci').value;

    fetch(`http://localhost:3000/clients/ci/${ci}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Cliente no encontrado');
            }
            return response.json();
        })
        .then(cliente => {
            document.getElementById('name').value = cliente.name;
            document.getElementById('phone').value = cliente.phone;
            document.getElementById('email').value = cliente.email;
            document.getElementById('address').value = cliente.address;

            document.getElementById('clientInfo').classList.remove('hidden');
        })
        .catch(error => {
            alert(error.message);
        });
});

document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const ci = document.getElementById('ci').value;
    const updatedCliente = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value
    };
    fetch(`http://localhost:3000/clients/${ci}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCliente)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar el cliente');
        }
        return response.json();
    })
    .then(cliente => {
        alert('Información del cliente actualizada correctamente.');
        console.log('Cliente actualizado:', cliente);
    })
    .catch(error => {
        alert(error.message);
    });
});
