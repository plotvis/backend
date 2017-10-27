module.exports = {
    port: process.env.PORT || 8080,
    mongodbUrl: process.env.mongoUrl || 'mongodb://localhost:27017/rachis',
    secret: 'ThIsIsSoSeCrEt!!',
};
