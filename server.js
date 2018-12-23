
const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const mongoose = require('./db/dbConnection');


const createEmployee = require('./apicontroller/employee');

 
const app = express();
 
// // 'Access-Control-Allow-Origin'
app.use(cors());
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//json parser
app.use(bodyParser.json(), function (err, req, res, next) {

  if (err) {
    return res.status(400).send(err);
  }
});

// controllers
createEmployee(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {

  console.log(`server listens on port ${port}.`);
});

// es6 short syntax for object to export.
module.exports = app;