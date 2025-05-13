const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=51.2089&longitude=3.2242&hourly=temperature_2m&forecast_days=10";
let allData = [];

async function getWeather() {
    try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const times = data.hourly.time;
    const temps = data.hourly.temperature_2m;

    allData = times.map((time, i) => ({
    date: new Date(time),
    temp: temps[i]
    }));

    renderData(allData); // Show all by default
    } catch (error) {
    console.error("Failed to fetch weather data:", error);
    }
}

function renderData(filteredData) {
    const weatherContainer = document.getElementById("weather");
    weatherContainer.innerHTML = "";

    filteredData.forEach(({ date, temp }) => {
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    const box = document.createElement("div");
    box.className = "weather-box";
    box.innerHTML = `
        <h3>${dateStr}</h3>
        <p>${timeStr}</p>
        <h2>${temp}°C</h2>
    `;

    weatherContainer.appendChild(box);
    });
}

function filterData(filter) {
    const now = new Date();
    const today = now.toDateString();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const tomorrowStr = tomorrow.toDateString();

    let filtered = [];

    if (filter === "today") {
    filtered = allData.filter(d => d.date.toDateString() === today);
    } else if (filter === "tomorrow") {
    filtered = allData.filter(d => d.date.toDateString() === tomorrowStr);
    } else {
    filtered = allData;
    }

    renderData(filtered);
}

getWeather();