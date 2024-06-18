document.addEventListener('DOMContentLoaded', function() {
    const appointmentsTableBody = document.getElementById('appointmentsTable').querySelector('tbody');

    function fetchAppointments() {
        fetch('http://localhost:3000/appointments')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener las citas');
                }
                return response.json();
            })
            .then(appointments => {
                appointmentsTableBody.innerHTML = '';
                appointments.forEach(appointment => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${appointment.ciClient}</td>
                        <td>${appointment.emailClient}</td>
                        <td>${appointment.phoneClient}</td>
                        <td>${appointment.time}</td>
                        <td>${appointment.typeService}</td>
                        <td>${appointment.date}</td>
                        <td>${appointment.description}</td>
                    `;
                    appointmentsTableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
            });
    }

    fetchAppointments();
});
