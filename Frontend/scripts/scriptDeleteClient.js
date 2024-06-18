document.addEventListener('DOMContentLoaded', () => {
    const deleteClientForm = document.getElementById('deleteClientForm');
    const messageDiv = document.getElementById('message');

    deleteClientForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const ci = deleteClientForm.ci.value;

        try {
            const response = await fetch(`http://localhost:3000/clients/ci/${ci}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar cliente');
            }

            const data = await response.json();
            messageDiv.textContent = data.message;
        } catch (error) {
            console.error('Error:', error);
            messageDiv.textContent = 'Error al eliminar cliente';
        }
    });
});
