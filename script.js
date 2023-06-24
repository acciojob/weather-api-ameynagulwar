//your JS code here. If required.
describe("Weather API", () => {
  it("displays current weather for London", () => {
    // Visit the application URL
    cy.visit("http://your-app-url.com");

    // Wait for the weather button to become visible
    cy.get("#weatherButton").should("be.visible");

    // Intercept the API request and provide a response
    cy.intercept("GET", "https://api.openweathermap.org/data/2.5/weather**").as(
      "getCurrentWeather"
    );

    // Click the weather button
    cy.get("#weatherButton").click();

    // Wait for the API request to be made and get the response
    cy.wait("@getCurrentWeather").then((interception) => {
      // Extract the weather data from the response
      const weatherData = interception.response.body;

      // Assert on the weather data or perform other assertions as needed
      expect(weatherData.name).to.equal("London");
      expect(weatherData.weather[0].description).to.be.a("string");

      // Assert that the weather data is displayed in the div element
      cy.get("#weatherData").should(
        "have.text",
        `Current weather in London: ${weatherData.weather[0].description}`
      );
    });
  });
});
// cypress/integration/weather-api.spec.js

describe("Weather API", () => {
  it("displays current weather for London", () => {
    cy.visit("http://your-app-url.com");

    // Rest of the test case code
    // ...
  });
});
