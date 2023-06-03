const {connection}=require('./Config/db');
require('dotenv').config();
const app=require('express')();
const {registerrouter}=require('./Routes/register.router')
const {postroute}=require('./Routes/post.router')
var bodyParser = require('body-parser')
app.use(bodyParser.json())

// *ROUTES*

app.use('/',registerrouter);
app.use('/',postroute)


app.listen(9160,async()=>{
    try{
        await connection;
        console.log("Connected to DB")
    }catch(err){
        console.log("error")
    }

    console.log("Server is running..")
})