const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const config          = require('../config');

const flightSchema = new Schema({
  flightNumber:  Number,
  name: String,
  flightDate: Date,
  placeName: String,
  droneName: String,
  droneBrand: String,
  droneModel: String,
  distance: Number,
  durationSeconds: Number,
  flightType: String,
  mainFlightType: String,
  notes: String,
  conditions: String,
  cloudCoverage: Number,
  temperature: Number,
  wind: Number,
  humidity: Number,
  maxAltitude: Number,
  maxAltitudeAGL: Number,
  nbFlight: Number,
  creationDate: Date,
  pilotInfo: String,
  personnel: String,
  projectReference: String,
  equipment: String,
  tags: String,
  user: Schema.Types.ObjectId
});

mongoose.connect(config.mongodbUrl);

const Flight = mongoose.model('Flight', flightSchema );
exports.Flight = Flight;
