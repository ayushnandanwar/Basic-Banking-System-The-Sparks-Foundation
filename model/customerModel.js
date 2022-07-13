const mongoose = require('mongoose');
const uuid = require('uuid')

function generate(n) {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   
    
    if ( n > max ) {
            return generate(max) + generate(n - max);
    }
    
    max        = Math.pow(10, n+add);
    var min    = max/10; // Math.pow(10, n) basically
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;
    
    return ("" + number).substring(add); 
}

const CustomerSchema = new mongoose.Schema({ 
    account_no:{
        type:Number,
        unique:true,
        default:()=>{ return generate(12)}
    },
    name:{
        type:String,
        required:[true,"Please provide customer name"]
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    current_balance:{
        type:Number,
        default:0
    },
})

const Customer = mongoose.model("Customer",CustomerSchema);

module.exports = Customer;