const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');


fetchMyIP((error, ip) => {
  // if (error) {
  //   console.log("It didn't work!" , error);
  //   return;
  // }

 
});


// fetchCoordsByIP("24.84.209.238", (error, data) => {
//   console.log(error, data);
// });

// fetchISSFlyOverTimes({ latitude: 49.2155, longitude: -123.1427 }, (error, data) => {
//   console.log(error,data);

// });

