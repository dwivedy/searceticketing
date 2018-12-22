
const mongoose = require('mongoose');

const validator = require('validator');

 
const Schema = mongoose.Schema;

const ticketSchema = new Schema({ 
  title: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    // maxlength: 30
  },
  employeeNameRef: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
    trim: true
  },
   
  dated: { type: Date, default: Date.now },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
 
