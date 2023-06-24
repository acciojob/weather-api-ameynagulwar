function getCurrentWeather() {
    // Make a GET request to the weather API
    fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY')
        .then(response => response.json())
        .then(data => {
            // Extract the weather description from the API response
            const weatherDescription = data.weather[0].description;

            // Update the weatherData div with the weather information
            const weatherDataElement = document.getElementById('weatherData');
            weatherDataElement.textContent = `Current weather in London: ${weatherDescription}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
