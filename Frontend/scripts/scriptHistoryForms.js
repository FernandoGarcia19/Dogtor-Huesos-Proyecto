document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('medicalHistoryForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const medicalHistory = {
            namePet: document.getElementById('namePet').value,
            date: document.getElementById('date').value,
            condition: document.getElementById('condition').value,
            treatment: document.getElementById('treatment').value,
            notes: document.getElementById('notes').value
        };

        fetch('http://localhost:3000/clinical-history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicalHistory)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al añadir el historial médico');
            }
            return response.json();
        })
        .then(data => {
            alert('Historial médico añadido correctamente');
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
    });
});
