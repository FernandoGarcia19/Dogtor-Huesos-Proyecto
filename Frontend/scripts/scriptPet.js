document.addEventListener('DOMContentLoaded', () => {
    const petsContainer = document.getElementById('pets-container');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    let allPets = []; 

    async function fetchPets() {
        try {
            const response = await fetch('http://localhost:3000/pets');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            allPets = await response.json();
            displayPets(allPets);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            petsContainer.innerHTML = `<p>Error al cargar las mascotas: ${error.message}</p>`;
        }
    }

    function displayPets(pets) {
        petsContainer.innerHTML = '';
        pets.forEach(pet => {
            const petDiv = document.createElement('div');
            petDiv.classList.add('pet');

            petDiv.innerHTML = `
                <h2>${pet.namePet}</h2>
                <p><strong>Especie:</strong> ${pet.species}</p>
                <p><strong>Peso:</strong> ${pet.weight} kg</p>
                <p><strong>Edad:</strong> ${pet.age} años</p>
                <p><strong>Tamaño:</strong> ${pet.size}</p>
                <button class="delete-button" data-name="${pet.namePet}">Eliminar</button>
            `;
            petsContainer.appendChild(petDiv);
        });
    }

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm === '') {
            displayPets(allPets); 
            return;
        }

        const filteredPets = allPets.filter(pet => pet.namePet.toLowerCase().includes(searchTerm));
        displayPets(filteredPets);
    });

    petsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-button')) {
            const namePet = event.target.dataset.name;
            if (confirm(`¿Estás seguro de eliminar la mascota "${namePet}"?`)) {
                deletePetByName(namePet);
            }
        }
    });

    async function deletePetByName(namePet) {
        try {
            const response = await fetch(`http://localhost:3000/pets/${namePet}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            alert(`Mascota "${namePet}" eliminada exitosamente`);
            fetchPets();
        } catch (error) {
            console.error('There has been a problem with your delete operation:', error);
        }
    }

    fetchPets(); 
});
