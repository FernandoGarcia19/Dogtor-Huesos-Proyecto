document.addEventListener('DOMContentLoaded', () => {
    const clientsContainer = document.getElementById('clients-container');
    const searchBtn = document.getElementById('search-btn');
    const ciInput = document.getElementById('ci-input');

    searchBtn.addEventListener('click', async () => {
        const ci = ciInput.value.trim();
        if (ci) {
            await fetchClientsByCI(ci);
        }
    });

    async function fetchClientsByCI(ci) {
        try {
            const response = await fetch(`http://localhost:3000/clients/ci/${ci}`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const client = await response.json();
            displayClients([client]);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    async function fetchClients() {
        try {
            const response = await fetch('http://localhost:3000/clients');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const clients = await response.json();
            displayClients(clients);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    function displayClients(clients) {
        clientsContainer.innerHTML = ''; // Clear previous content
        clients.forEach(client => {
            const clientDiv = document.createElement('div');
            clientDiv.classList.add('client');
            clientDiv.innerHTML = `
                <h2>${client.name}</h2>
                <p><strong>Email:</strong> ${client.email}</p>
                <p><strong>CI:</strong> ${client.ci}</p>
            `;
            clientsContainer.appendChild(clientDiv);
        });
    }

    fetchClients();
});
