const db=require('./db');
const express =require('express');
const { route } = require('./routes/auth');
const app=express();
const port=7000;
app.use(express.json());//see req.body on terminal


app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'))


app.listen(port,(err)=>{
    console.log('Hi Bhavesh Sir Hosted SuccessFuly.... at port => ');
})