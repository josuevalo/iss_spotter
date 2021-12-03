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
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    }
  });
};



const fetchCoordsByIP = function(ip, callback) {
  console.log('ip', ip);
  request(`https://api.freegeoip.app/json/${ip}?apikey=289956b0-53e9-11ec-b0b9-9b16bfdd41bb` ,(error, response, body) => {
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


const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}` ,(error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS data ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      let response = JSON.parse(body).response;
      callback(null, response);
    }
  });
};


const nextISSTimesForMyLocation = function(callback) {
 
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(data, (error, data) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, data);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };