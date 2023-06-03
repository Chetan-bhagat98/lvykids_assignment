const {registermodel} = require("../Model/register");
const express=require("express");
const app=express()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const registerrouter=express.Router();



// *****************NEW REGISTERED USER (Query posts with their detail)****************

registerrouter.post("/api/user",async(req,res)=>{
    const payload=req.body;
    let email=payload.email;
    let check=await registermodel.find({email});
    if(check.length>0){
        res.send({"msg":"User Exist"});
    }else{
        try{
            bcrypt.hash(payload.password, 2, async(err, hash)=> {
               try{
                if(hash){
                    payload.password=hash;
                    const data= await new registermodel(payload);
                    await data.save()
                    res.send({"msg":"NEW REGISTRATION SUCCESSFUL"});
                   }else{
                    res.send({"msg":"ERROR WHILE HASHING"})
                   }
               }catch(err){
                console.log("ERROR IN REGISTER",err)
                res.send({"msg":"ERROR WHILE REGISTER"})
               }
            });
    
        }catch(err){
            console.log("ERROR",err)
        }
    }
                
});

// *****************LOGIN REGISTERED USER****************

registerrouter.post("/api/login",async(req,res)=>{
    const {email,password}=req.body;
    try{ 
        const data= await registermodel.find({email});
        if(data.length>0){
        bcrypt.compare(password, data[0].password, function(err, result) {
            if(result){
                var token = jwt.sign({ ID: data[0]._id }, process.env.key);
                res.status(200).send({"msg":"LOGGIN SUCCESSFUL",
               "token":token });
            }else{
               res.status(404).send({"msg":"Invalid password"})
            }
         });
       }else{
        res.status(404).send({"msg":"email not Found"})
       }
       
    }catch(err){
        console.log("ERROR",err)
    }
})


// ******Query a single post by its ID****

registerrouter.post("/api/user/:id",async(req,res)=>{
    const id=req.params.id;
    let check=await registermodel.find({_id:id});
    console.log("eoor",check)
    if(check.length>0){
        res.status(200).send(check)  
    }else{
        res.status(404).send('No users found')
              
    }
                
});

module.exports={registerrouter}