module.exports = {
    port: process.env.PORT || 8080,
    mongodbUrl:  'mongodb://plotvis:Plotvissecurepass@ds251245.mlab.com:51245/plotvis' || process.env.mongoUrl || 'mongodb://localhost:27017/plotvis',
    secret: 'ThIsIsSoSeCrEt!!',
    rootDir: __dirname
};
