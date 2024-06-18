document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    const form = document.getElementById('appointmentForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');

        const ciClient = document.getElementById('ciClient');
        const name = document.getElementById('name');
        const emailClient = document.getElementById('emailClient');
        const phoneClient = document.getElementById('phoneClient');
        const time = document.getElementById('time');
        const typeService = document.getElementById('typeService');
        const date = document.getElementById('date');
        const petType = document.getElementById('petType');
        const description = document.getElementById('description');
        const status = true;

        // Verifica que todos los elementos existan antes de intentar acceder a sus valores
        if (!ciClient || !name || !emailClient || !phoneClient || !time || !typeService || !date || !petType || !description || !status) {
            console.error('One or more form elements are missing');
            return;
        }

        const appointmentData = {
            ciClient: ciClient.value,
            name: name.value,
            emailClient: emailClient.value,
            phoneClient: phoneClient.value,
            time: time.value,
            typeService: typeService.value,
            date: date.value,
            petType: petType.value,
            description: description.value,
            status: true
        };

        console.log('Appointment Data:', appointmentData);

        fetch('http://localhost:3000/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointmentData)
        })
        .then(response => {
            console.log('Response received');
            if (!response.ok) {
                throw new Error('Error al crear la cita');
            }
            return response.json();
        })
        .then(data => {
            console.log('Appointment created successfully:', data);
            alert('Cita creada exitosamente');
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
    });
});
