module.exports = {
    port: process.env.PORT || 8080,
    // mongodbUrl: 'mongodb://admin:Plotvissecurepass@cluster0-shard-00-00-rjote.mongodb.net:27017,cluster0-shard-00-01-rjote.mongodb.net:27017,cluster0-shard-00-02-rjote.mongodb.net:27017/plotvis?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin' || process.env.mongoUrl || 'mongodb://localhost:27017/plotvis',
    mongodbUrl:  process.env.mongoUrl || 'mongodb://localhost:27017/plotvis',
    secret: 'ThIsIsSoSeCrEt!!',
    rootDir: __dirname
};
