"use strict";
const request = require("postman-request");
const log = console.log;

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=724cdc71383ff298d513a951fe60e4bd&query=${lat},${long}&units=m`;
  request({ url, json: true }, (error, { body: data } = {}) => {
    if (error) {
      callback("Unable to connect to the server.", undefined);
    } else if (data.error) {
      callback("No matching location found! Please try again.", undefined);
    } else {
      callback(undefined, {
        weather: `${data.current.weather_descriptions[0]}`,
        degree: `${data.current.temperature}`,
        feelslike: `${data.current.feelslike}`,
        forecast: `${data.current.weather_descriptions[0]}. It is ${data.current.temperature} degrees outside, and it feels like ${data.current.feelslike} degrees.`,
      });
    }
  });
};

module.exports = forecast;
