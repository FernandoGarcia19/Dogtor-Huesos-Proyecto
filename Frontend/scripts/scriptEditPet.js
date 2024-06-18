document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;

    fetch(`http://localhost:3000/pets/${name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Mascota no encontrada');
            }
            return response.json();
        })
        .then(pet => {
            document.getElementById('id').value = pet.id;
            document.getElementById('species').value = pet.species;
            document.getElementById('weight').value = pet.weight;
            document.getElementById('age').value = pet.age;
            document.getElementById('size').value = pet.size;

            document.getElementById('petInfo').classList.remove('hidden');
        })
        .catch(error => {
            alert(error.message);
        });
});

document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const updatedPet = {
        species: document.getElementById('species').value,
        weight: document.getElementById('weight').value,
        age: document.getElementById('age').value,
        size: document.getElementById('size').value
    };
    fetch(`http://localhost:3000/pets/${name}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPet)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar la mascota');
        }
        return response.json();
    })
    .then(pet => {
        alert('Información de la mascota actualizada correctamente.');
        console.log('Mascota actualizada:', pet);
    })
    .catch(error => {
        alert(error.message);
    });
});
