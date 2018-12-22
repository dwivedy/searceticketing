
const mongoose = require('mongoose');

const config = require('../config/config.json');

mongoose.Promise = global.Promise;


// connection to database
mongoose.connect(config.mongodbURI,()=>{
    console.log('connection to database success.');
});

// es6 syntax
module.exports = mongoose;