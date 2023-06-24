function getCurrentWeather() {
    return fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY')
        .then(response => response.json())
        .then(data => data.weather[0].description)
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

// Export the function for Cypress test
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getCurrentWeather
    };
}

describe('Weather Application', () => {
    it('displays current weather for London', () => {
        cy.visit('index.html');

        // Stub the API request
        cy.server();
        cy.route('GET', 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY', {
            weather: [{
                description: 'Clouds'
            }]
        }).as('getCurrentWeather');

        // Trigger the button click and wait for the API response
        cy.get('button').click();
        cy.wait('@getCurrentWeather').its('status').should('eq', 200);

        // Verify the weather data in the DOM
        cy.get('#weatherData').should('have.text', 'Current weather in London: Clouds');
    });
});
