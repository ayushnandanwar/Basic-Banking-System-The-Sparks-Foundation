const Customer = require('../model/customerModel'); 

exports.getAllCustomer = async (req,res)=>{
    try {
        const customers = await Customer.find({});
        res.render('viewAllCustomer',{
            success:true,
            count:customers.length,
            customers
        })
    } catch (err) {
        res.json({
            success:false,
            message:err.message
        })
    }
}

exports.getOneCustomer = async (req,res)=>{
    try {
        const customer = await Customer.findOne({_id:req.params.id})
        const customers = await Customer.find({_id:{$ne:req.params.id}});
        res.render('customer',{
            success:req.query.success,
            customer,
            customers,
            message:req.query.message,
        })
    } catch (err) {
        res.json({
            success:false,
            message:err.message 
        })
    }
}

exports.createCustomer = async (req,res)=>{
    try {
        const customer = await Customer.create({
            name:req.body.name,
            email:req.body.email
        })
        res.json({
            success:true,
            message:"Customer Created",
            customer
        })
    } catch (err) {
        res.json({
            success:false,
            message:err.message
        })
    }
}