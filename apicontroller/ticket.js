 

// fetching votes model
const TicketModel = require('../models/ticket');

// fetching votes model, this is not instance 
const EmployeeCollection = require('../models/employee');


module.exports = function (app) {

    app.post('/api/votemm', (req, res) => {
        if (req.body.hasOwnProperty('email') && req.body.hasOwnProperty('id')) {
            let ticket = { employeeNameRef: req.body.id, email: req.body.email };

            TicketModel.create(ticket).then((savedTicket) => {

                let employee = { _id: savedTicket.employeeNameRef };

                employee.tickets.push(savedTicket._id);

                EmployeeCollection.create(employee).then(() => {

                    return res.status(400).send({ "InvalidParty": "No such party found." });

                }).

                    catch((e) => {

                        employee.tickets.push(savedTicket._id);



                        return

                        // return res.status(400).send(e);
                    });

            }).
                catch((e) => {
                    return res.status(400).send(e); // voter error

                });

        } else {
            return res.status(400).send({ "badData": "bad data recieved." });
        }
    });



    app.get('/api/votes', (req, res) => {
        var ip;
        if (req.headers['x-forwarded-for']) {
            ip = req.headers['x-forwarded-for'].split(",")[0];
        } else if (req.connection && req.connection.remoteAddress) {
            ip = req.connection.remoteAddress;
        } else {
            ip = req.ip;
        }console.log("client IP is *********************" + ip);

        

        VoterModel.find().populate('partyNameRef').then((voters) => {
            // throw new Error("i am an error");
            let totalVotes = voters.length; // monkey patching add totalVotes Property to voters obj.
            return res.send({ voters, totalVotes });


        }).catch((e) => {

            return res.status(400).send(e);


        });

    });  

};