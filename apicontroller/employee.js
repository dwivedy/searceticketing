const _ = require("lodash");
const { ObjectID } = require("mongodb");
const EmployeeCollection = require("../models/employee");

const TicketCollection = require("../models/ticket");

// middleware to authenticate employee.
const authenticate = require("../middlewares/authenticateEmployee");

module.exports = function(app) {
  app.post("/api/create/ticket", authenticate, (req, res) => {
    let id = req.employee._id;
    console.log(id);
    EmployeeCollection.findById(id).then(employeeFind => {
      let ticket = new TicketCollection({
        employeeNameRef: employeeFind._id,
        title: req.body.title
      });
      console.log("**** " + ticket);
      ticket
        .save()
        .then(ticketSaved => {
          employeeFind.tickets.push(ticketSaved._id); // add ticket to employee
          employeeFind.employeeTickets = employeeFind.tickets.length; // add total tickets for given employee.
          employeeFind
            .save()
            .then(employeeSaved => {
              // res.redirect('/api/employee');
              // console.log(employeeSaved);
              res.send(employeeSaved);
            })
            .catch(e => {
              return res.status(400).send(e);
            });
        })
        .catch(e => {
          return res.status(400).send(e);
        });
    });
  });

  app.post("/api/create/employee", (req, res) => {
    let employeeParam = req.body.employeeName;

    // let body = _.pick(req.body, ["employeeName"]);
    // let employee = new EmployeeCollection(body);

    // employee
    //   .save()
    //   .then(() => {
    //     //redirect after successful employee save.

    //     return employee.generateAuthToken();
    //     // return res.send({ employeeSaved });
    //   })
    //   .then(token => {
    //     res.header("x-auth", token).send(employee);
    //   })
    //   .catch(e => {
    //     return res.status(400).send(e);
    //   });

    EmployeeCollection.findOne({ employeeName: employeeParam })
      .then(employeeDoc => {
        if (employeeDoc === null) {
          let employee = new EmployeeCollection();

          employee.employeeName = employeeParam;

          employee
            .save()
            .then(() => {
              //redirect after successful employee save.

              return employee.generateAuthToken();
              // return res.send({ employeeSaved });
            })
            .then(token => {
              res.header("x-auth", token).send({ employee });
            })
            .catch(e => {
              return res.status(400).send(e);
            });
        } else {
          return res.send({ employeeExists: "employee already exists." });
        } //else
      }) //then
      .catch(e => {
        return res.status(400).send(e);
      }); //findone
  }); //post

  // delete a ticket

  app.delete("/api/delete/ticket/:id", authenticate, (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    TicketCollection.findByIdAndRemove(id)
      .then(ticketDeleted => {
        if (!ticketDeleted) {
          return res.status(404).send();
        }

        let employeeID = ticketDeleted.employeeNameRef;
        EmployeeCollection.findById(employeeID)
          .then(employee => {
            if (!employee) {
              return res.status(404).send();
            }
            console.log(JSON.stringify(ticketDeleted._id));
            let index = employee.tickets.indexOf(ticketDeleted._id);
            // employee.tickets.filter(e => e !== JSON.stringify(ticketDeleted._id));
            if (index > -1) {
              employee.tickets.splice(index, 1);
            }

            console.log(employee.tickets);
            employee.employeeTickets = employee.tickets.length;
            employee
              .save()
              .then(employeeSaved => {
                // res.redirect('/api/employee');
                // console.log(employeeSaved);
                res.send(employeeSaved);
              })
              .catch(e => {
                return res.status(400).send(e);
              });
          })
          .catch(e => {
            return res.status(400).send(e);
          });

        // return res.send({ ticketDeleted });
      })
      .catch(e => {
        return res.status(400).send(e);
      });
  });

  // update a ticket
  app.patch("/api/update/ticket/:id", authenticate, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ["title"]);
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    TicketCollection.findByIdAndUpdate(id, { $set: body }, { new: true })
      .then(ticket => {
        if (!ticket) {
          return res.status(404).send();
        }
        res.send(ticket);
      })
      .catch(e => {
        return res.status(400).send(e);
      });
  });

  // login
  app.get("/api/employee/login", authenticate, (req, res) => {
    res.send(req.employee);
  });

  app.get("/api/employee", (req, res) => {
    EmployeeCollection.find()
      .populate("tickets")
      .then(employee => {
        // throw new Error("i am an error");
        return res.send({ employee });
      })
      .catch(e => {
        return res.status(400).send(e);
      });
  }); //get
}; //main function
