"use strict";
const request = require("postman-request");
const log = console.log;

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiamNoYTA3MTMiLCJhIjoiY2p0NWVnY2F6MDVsajQzcDNic3gwMHl4MCJ9.sHO0NjdM5ExIXi4r-0MZZQ&limit=1`;
  request({ url, json: true }, (error, { body: data } = {}) => {
    if (error) {
      callback("Unable to connect to the server.");
    } else if (data.features.length === 0) {
      callback("No matching location found! Please try again.");
    } else {
      for (let i = 0; i < data.features.length; i++) {
        callback(undefined, {
          longitude: data.features[i].center[0],
          latitude: data.features[i].center[1],
          location: data.features[i].place_name,
        });
      }
    }
  });
};

module.exports = geocode;
