const EmployeeCollection = require("../models/employee");

// middleware to populate predefined party name.
module.exports = function(req, res, next) {
  let token = req.header("x-auth");
  EmployeeCollection.findByToken(token)
    .then(employee => {
      if (!employee) {
        return Promise.reject();
      }
      req.employee= employee;
      req.token= token;
      next();
    })
    .catch(e => {
      res.status(401).send();
    });
};
