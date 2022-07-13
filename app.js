const express = require('express');
const app = express();


bodyParser = require('body-parser');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

 app.use(express.json())  
 
 // Pug Set up
 app.set("view engine","pug") 
 app.use(express.static('public'))
 const indexRouter = require('./routes/index');

app.get('/',(req,res)=>{
    res.sendFile('./public/index.html')
})

app.use('/',indexRouter);



module.exports = app;