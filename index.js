var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var cors            = require('cors');
var config          = require('./config');
var mongoose        = require('mongoose');
var cluster         = require('cluster');


if (cluster.isMaster) {
  var numWorkers = require('os').cpus().length;
  for(var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }
} else {
  // JSON WEB TOKEN
  app.set('superSecret', 'ThIsIsSoSeCrEt'); // secret variable

  /* Cors
   * Allows for external services to make API requests
   */
  app.use(cors());

  if (process.env.NODE_ENV !== 'production') {
    var logger = require('morgan');
    app.use(logger('dev'));
  }

  /* Body Parser
   * Parses incoming requests and puts them in the req.body
   * variable
   */
   app.use(bodyParser.urlencoded({ extended: false }));
   app.use(bodyParser.json());

  mongoose.connect(config.mongodbUrl, {
    useMongoClient: true
  });


  /* External Routes
   * Abstratcs out routes
   */
  app.use('/', require('./routes'));

  app.listen(config.port);
  console.log("Listening on port " + config.port);
}
