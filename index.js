const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  // console.log(passTimes);
  printPassTimes(passTimes);
});


// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');


// fetchMyIP((error, ip) => {
// if (error) {
//   console.log("It didn't work!" , error);
//   return;
// }
// });


// fetchCoordsByIP("24.84.209.238", (error, data) => {
//   console.log(error, data);
// });

// fetchISSFlyOverTimes({ latitude: 49.2155, longitude: -123.1427 }, (error, data) => {
//   console.log(error,data);

// });

