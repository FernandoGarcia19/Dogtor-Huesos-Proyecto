document.addEventListener('DOMContentLoaded', function() {
    const historyTableBody = document.querySelector('#HistoryTable tbody');
    async function fetchHistory() {
        try {
            const response = await fetch('http://localhost:3000/clinical-history');
            if (!response.ok) {
                throw new Error('Error al obtener el historial médico');
            }
            const history = await response.json();
            displayHistory(history);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    function displayHistory(history) {
        historyTableBody.innerHTML = '';

        history.forEach(record => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = record.namePet;
            row.appendChild(nameCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = record.date;
            row.appendChild(dateCell);

            const conditionCell = document.createElement('td');
            conditionCell.textContent = record.condition;
            row.appendChild(conditionCell);

            const treatmentCell = document.createElement('td');
            treatmentCell.textContent = record.treatment;
            row.appendChild(treatmentCell);

            const notesCell = document.createElement('td');
            notesCell.textContent = record.notes;
            row.appendChild(notesCell);

            historyTableBody.appendChild(row);
        });
    }

    fetchHistory();
});
