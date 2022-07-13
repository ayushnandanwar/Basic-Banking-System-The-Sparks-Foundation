const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController')
const transactionContoller = require('../controllers/transactionController')

//   /
//  Customers
router.get('/customers',customerController.getAllCustomer)
router.get('/customers/:id',customerController.getOneCustomer);

router.post('/customers/new',customerController.createCustomer)


// Transactions
router.get('/transactions',transactionContoller.getAllTransactions);

router.post('/add/:id',transactionContoller.addMoney);

router.post('/transfer/:from',transactionContoller.transferMoney);   // to in req.body


 
module.exports = router;