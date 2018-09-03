// @flow

const functions = require('firebase-functions');
const weather = require('./weather.js');

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((req, res) => {
  // Get the city and date from the request
  const geocity = req.body.queryResult.parameters['geo-city']; // city is a required param

  // Get the date for the weather forecast (if present)
  let desiredDate = '';
  if (req.body.queryResult.parameters.date) {
    desiredDate = req.body.queryResult.parameters.date;
    // console.log(`Date: ${date}`);
  }

  // Call the weather API
  weather.callWeatherApi(geocity, desiredDate).then((output) => {
    res.json({ fulfillmentText: output }); // Return the results of the weather API to Dialogflow
  }).catch(() => {
    res.json({ fulfillmentText: 'I don\'t know the weather but I hope it\'s good!' });
  });
});
