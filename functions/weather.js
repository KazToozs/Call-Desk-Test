const http = require('http');

const host = 'api.worldweatheronline.com';
const wwoApiKey = '96787bdca10e476b92b132115180209';


/**
  * Calls the API for weather forecast
  * @param {string} city city we want the forecast for
  * @param {string} date date we want the forecast for
  * @returns {Promise} with weather output
  */
module.exports = {
  callWeatherApi(city, date) {
    return new Promise((resolve, reject) => {
    // Create the path for the HTTP request to get the weather
      const path = `${'/premium/v1/weather.ashx?format=json&num_of_days=1'
      + '&q='}${encodeURIComponent(city)}&key=${wwoApiKey}&date=${date}`;
      // console.log(`API Request: ${host}${path}`);

      // Make the HTTP request to get the weather
      http.get({ host, path }, (resp) => {
        let body = ''; // var to store the response chunks
        resp.on('data', (d) => { body += d; }); // store each response chunk
        resp.on('end', () => {
        // After all the data has been received parse the JSON for desired data
          const response = JSON.parse(body);
          const forecast = response.data.weather[0];
          const location = response.data.request[0];
          const conditions = response.data.current_condition[0];
          const currentConditions = conditions.weatherDesc[0].value;

          // Create response
          const output = `Current conditions in the ${location.type}
        ${location.query} are ${currentConditions} with a projected high of
        ${forecast.maxtempC}°C or ${forecast.maxtempF}°F and a low of
        ${forecast.mintempC}°C or ${forecast.mintempF}°F on
        ${forecast.date}.`;

          // Resolve the promise with the output text
          // console.log(output);
          resolve(output);
        });
        resp.on('error', () => {
          // console.log(`Error calling the weather API: ${error}`);
          reject();
        });
      });
    });
  },
};
