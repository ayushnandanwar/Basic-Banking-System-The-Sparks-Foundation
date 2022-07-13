const Transaction = require('../model/transactionModel')
const Customer = require('../model/customerModel')
const url = require('url');    


exports.addMoney = async (req,res)=>{
    try {
        let customer = await Customer.findOne({_id:req.params.id});
        let amt = Number(req.body.amount);
        if(amt < 1){
            throw new Error("Amount should be greater than 1");
        }
        customer.current_balance += amt;

        await customer.save();

        // res.json({
        //     success:true,
        //     message:"Money added successfully",
        //     customer
        // })
        res.redirect(url.format({
            pathname:'/customers/'+customer._id,
            query:{
                message:"Money Added Successfully",
                success:true
            }
        }))
        // res.redirect('/customers/' + customer._id);
    } catch (err) {
        // res.json({
        //     success:false,
        //     message:err.message
        // })
        let customer = await Customer.findOne({_id:req.params.id})
        res.redirect(url.format({
            pathname:'/customers/'+customer._id,
            query:{
                message:"Sorry, We are unable to add Money, Try again",
                success:false
            }
        }))
    }   
}

exports.transferMoney = async (req,res)=>{
    try {
        // console.log(req.body);
        if(req.params.from === req.body.to){
            throw new Error("You Cannot transfer money from same account")
        }
        let customerFrom = await Customer.findOne({_id:req.params.from});
        let customerTo = await Customer.findOne({_id:req.body.to});
        // console.log(customerTo);
        if(customerFrom == null || customerTo == null){
            throw new Error("Customer Not found");
        }
        let amt = Number(req.body.amount);
        if(amt <= 0){
            throw new Error("Minimum amount to transfer money is Rs. 1")
        }
        customerFrom.current_balance -= amt;
        if(customerFrom.current_balance < 0){
            throw new Error("Insufficient Balance!")
        }
        customerTo.current_balance += amt;
        let transaction = await Transaction.create({
            from:customerFrom._id,
            To:customerTo._id,
            trans_date:new Date(), 
            amount:amt
        })
        await customerFrom.save();
        // console.log("fomr saved");
        await customerTo.save();  
        // console.log("to saved");
        res.redirect(url.format({
            pathname:"/customers/"+customerFrom._id,
            query:{
                message:"Money Tranfered Successfully!",
                success:true
            }
        }))
        // res.json({
        //     success:true,
        //     message:"Money Transfered successfully",
        //     from:customerFrom,
        //     to:customerTo,
        //     transaction
        // })

    } catch (err) {
        // res.json({
        //     success:false,
        //     message:err.message
        // })
        res.redirect(url.format({
            pathname:"/customers/"+req.params.from,
            query:{
                message:err.message, 
                success:false
            }
        }))
    }
}

exports.getAllTransactions = async (req,res)=>{
    try {
        const transactions = await Transaction.find({});
        let customers = [];
        for(let i = 0;i < transactions.length;i++){
            // console.log(transactions[i]);
            let customerfrom = await Customer.findOne({_id:transactions[i].from});
            let customerto = await Customer.findOne({_id:transactions[i].To})
            customers.push({customerfrom,customerto})
        }
        res.render('transactions',{
            success:true,
            transactions,
            customers,
            count:transactions.length
        })
    } catch (err) {
        res.json({
            success:false,
            message:err.message
        })
    }
}