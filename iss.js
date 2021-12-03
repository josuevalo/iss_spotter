const request = require('request');

const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const ip = JSON.parse.ip;
      callback(null, ip);
    }
  });
};



const fetchCoordsByIP = function(ip, callback) {
  request(`https://api.freegeoip.app/json/"${ip}"?apikey=289956b0-53e9-11ec-b0b9-9b16bfdd41bb` ,(error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const latitude = JSON.parse(body).latitude;
      const longitude = JSON.parse(body).longitude;
      let latLong = {
        "latitude": latitude,
        "longitude": longitude,
      };
      callback(null, latLong);
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };