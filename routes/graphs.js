const config      = require('../config');
var url           = config.mongodbUrl;
const FlightModel = require('../models/flight.js').Flight;
const mongoose    = require('mongoose');
const async       = require('async');
mongoose.connect(url);

const places = function(req, res) {
  FlightModel.find().distinct('placeName', function(error, places) {
    res.json({success: true, places: places});
  });
}

const project = function(req, res) {
  FlightModel.find().distinct('projectReference', function(error, projects) {
    res.json({success: true, projects: projects});
  });
}

const uniques = function(req, res) {
  let keys = Object.keys(req.query);
  let uniques = {};
  async.each(keys, function(key, callback) {
    FlightModel.find().distinct(key, function(error, dbUniques) {
      uniques[key] = dbUniques;
      callback();
    });
  }, function(err) {
    if (err) {
      // oops
    } else {
      res.json({success: true, uniques: uniques});
    }
  })
}

const functions = {
    places: places,
    project: project,
    uniques: uniques
};

module.exports = functions;
