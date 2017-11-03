const fs = require('fs');
const csv = require('csv-parser');
const config = require('../config');

var url         = config.mongodbUrl;
const FlightModel = require('../models/flight.js').Flight;
const mongoose  = require('mongoose');
mongoose.connect(url);


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
                "pilotInfo",
                "Personnel",
                "projectReference",
                "equipment",
                "tags"]

const upload = function(req, res) {
  parse(req.file.path, req.decoded._id, function() {
    res.json({success: true});
  })
}

const parse = function(path, userId, cb) {
  console.log('PARSEING +___!_@_$_!$__#%_');
  var stream = csv({
    raw: false,
    separator: ';',
    newline: '\n',
    headers: headers
  })

  let flights = [];

  fs.createReadStream(`${config.rootDir}/${path}`)
  .pipe(stream)
  .on('data', function (data) {
    try {
      let FM = new FlightModel();
      FM.flightNumber = parseInt(data.flightNumber);
      FM.name = data.name;
      FM.flightDate = new Date(`${data.flightDate} ${data.flightTime}`); // UTC time
      FM.placeName = data.placeName;
      FM.droneName = data.droneName;
      FM.droneBrand = data.droneBrand;
      FM.distance = parseInt(data.distance);
      FM.durationSeconds = parseInt(data.durationSeconds);
      FM.flightType = data.flightType;
      FM.mainFlightType = data.mainFlightType;
      FM.notes = data.notes;
      FM.conditions = data.conditions;
      const co = data.conditionsDetail.split('|');
      FM.cloudCoverage = parseInt(co[0].substring(3, co[0].indexOf(' ')));
      FM.temperature = parseInt(co[1].substring(2, co[1].indexOf(' ')));
      FM.wind = parseFloat(co[2].substring(2, co[2].indexOf(' ')));
      FM.humidity = parseInt(co[3].substring(2, co[3].indexOf(' ')));
      FM.maxAltitude = parseInt(data.maxAltitude);
      FM.maxAltitudeAGL = parseInt(data.maxAltitudeAGL);
      FM.nbFlight = parseInt(data.nbFlight);
      FM.creationDate = new Date(data.creationDate);
      FM.pilotInfo = data['Pilot Info'];
      FM.personnel = data['Personnel'];
      FM.projectReference = data.projectReference;
      FM.equipment = data['equipment (name / serial# / FW / HW)'];
      FM.tags = data.tags;
      FM.user = mongoose.Types.ObjectId(userId);

      FM.save();

      // console.log(FM);
    } catch (e) {
      // console.log(e);
    }


    // console.log(data)
    flights.push(data)
  })
  .on('end', function() {
    cb();
  });
}

const all = function(req, res) {
  FlightModel.find({user: req.decoded._id}, function(err, docs) {
    res.json({success: true, logs: docs});
  });
}

const functions = {
    upload: upload,
    all: all
};

module.exports = functions;
