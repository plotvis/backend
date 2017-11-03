const fs = require('fs');
const csv = require('csv-parser');
const config = require('../config');

const headers = ["flightNumber",
                "name",
                "flightDate",
                "flightTime",
                "placeName",
                "droneName",
                "droneBrand",
                "droneModel",
                "distance",
                "durationSeconds",
                "flightType",
                "mainFlightType",
                "notes",
                "conditions",
                "conditionsDetail",
                "maxAltitude",
                "maxAltitudeAGL",
                "nbFlight",
                "creationDate",
                "Pilot Info",
                "Personnel",
                "projectReference",
                "equipment (name / serial# / FW / HW)",
                "tags"]

const parse = function(req, res) {
  var stream = csv({
    raw: false,
    separator: ';',
    newline: '\n',
    headers: headers
  })

  let flights = [];

  fs.createReadStream(config.rootDir + '/files/flights.csv')
  .pipe(stream)
  .on('data', function (data) {
    // console.log(data)
    flights.push(data)
  })
  .on('end', function() {
    res.json( {success: true, flights: flights} )

  });
}

const functions = {
    parse: parse,
};

module.exports = functions;
