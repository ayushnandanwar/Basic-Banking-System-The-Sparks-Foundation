const mongoose = require('mongoose');

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

const TransactionSchema = new mongoose.Schema({
    transaction_no:{
        type:Number,
        default:()=> {return generate(18)}
    },
    trans_date:{  
        type:Date
    },
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer"
    },
    To:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer"
    }, 
    amount:{
        type:Number
    }
})

const Transaction = new mongoose.model("Transaction",TransactionSchema);

module.exports = Transaction;