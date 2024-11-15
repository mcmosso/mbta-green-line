const map = L.map('map').setView([42.3601, -71.0589], 13); // Centered on Boston

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Populate dropdowns with T stops by line
async function fetchTStops() {
    const response = await fetch('https://api-v3.mbta.com/stops');
    const data = await response.json();

    const lines = {
        orange: document.getElementById('start-orange'),
        green: document.getElementById('start-green'),
        blue: document.getElementById('start-blue'),
        red: document.getElementById('start-red'),
    };

    const endLines = {
        orange: document.getElementById('end-orange'),
        green: document.getElementById('end-green'),
        blue: document.getElementById('end-blue'),
        red: document.getElementById('end-red'),
    };

    data.data.forEach(stop => {
        const line = stop.attributes.route_id; // Get the line id

        // Check for each line and populate corresponding dropdowns
        if (line === 'Orange') {
            lines.orange.appendChild(createOption(stop));
            endLines.orange.appendChild(createOption(stop));
        } else if (line === 'Green') {
            lines.green.appendChild(createOption(stop));
            endLines.green.appendChild(createOption(stop));
        } else if (line === 'Blue') {
            lines.blue.appendChild(createOption(stop));
            endLines.blue.appendChild(createOption(stop));
        } else if (line === 'Red') {
            lines.red.appendChild(createOption(stop));
            endLines.red.appendChild(createOption(stop));
        }
    });
}

// Create option elements for the dropdowns
function createOption(stop) {
    const option = document.createElement('option');
    option.value = stop.id;
    option.textContent = stop.attributes.name;
    return option;
}

// Calculate travel time
document.getElementById('calculate').addEventListener('click', async () => {
    const selectedLine = document.querySelector('select').value; // Get the selected line
    const startId = document.getElementById(`start-${selectedLine}`).value;
    const endId = document.getElementById(`end-${selectedLine}`).value;

    const response = await fetch(`https://api-v3.mbta.com/schedules?filter[stop]=${startId}&filter[route]=${endId}`);
    const data = await response.json();

    if (data.data.length > 0) {
        const travelTime = data.data[0].attributes.departure_time; // Adjust to get relevant data
        document.getElementById('result').innerText = `Estimated travel time: ${travelTime}`;
    } else {
        document.getElementById('result').innerText = 'No available route found.';
    }
});

fetchTStops();

