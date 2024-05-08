window.addEventListener('DOMContentLoaded', (event) => {
    fetch('allestrassenbubsheim.csv')
        .then(response => response.text())
        .then(data => {
            const nextCollectionDate = parseCSVForNextCollectionDate(data);
            document.getElementById('nextCollection').textContent = `Następny wywóz śmieci: ${nextCollectionDate}`;
        });
});

function parseCSVForNextCollectionDate(csvData) {
    const rows = csvData.split('\n').map(row => row.split(','));
    const dates = rows.map(row => new Date(row[1])); // Zakładając, że data jest w drugiej kolumnie
    const today = new Date();
    const futureDates = dates.filter(date => date > today);
    const nextDate = futureDates.length > 0 ? futureDates[0] : 'brak danych';
    return nextDate.toLocaleDateString('pl-PL');
}
