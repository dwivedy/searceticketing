const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");


const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  employeeName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },

  tickets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ticket"
    }
  ],
  tokens:[{

    access:{
        type:String,
        required:true
    }, 
    token:{
        type:String,
        required:true
    }
 } ],

  employeeTickets: { type: Number, default: 0 },

  created: { type: Date, default: new Date() }
});

// employeeSchema.methods.toJSON = function(){
//     let employee = this;
//     let employeeObj = employee.toObject();

//     return _.pick(employeeObj,["_id"]);
// };

employeeSchema.methods.generateAuthToken = function(){
let employee = this;
let access = "auth"
let token = jwt.sign({_id:employee._id.toHexString(),access},"secret").toString();
employee.tokens.push({access,token});
return employee.save().then(()=>{
    return token;
});

};

employeeSchema.statics.findByToken = function(token){
    let Employee = this;
    let decoded;

    try {
        decoded = jwt.verify(token,"secret");
    } catch (e) {
        // return new Promise((resolve,reject)=>{
        //     reject();
        // });
        return Promise.reject();
    }
    return Employee.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
 
};

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
