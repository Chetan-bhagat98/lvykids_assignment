const jwt = require("jsonwebtoken");
require("dotenv").config();  

const auth=async(req,res,next)=>{

   const token=req.headers.token;

   if(!token){
    res.send("Login Again")
   }
   try{
    var decoded = jwt.verify(token, process.env.key);
    if(decoded){
        req.body.postby=decoded.ID;
        next()
    }else{
        res.send({"msg":"LOGIN FIRST"})
    }
   }catch(err){
    res.send({"msg":err})
   }
   
}

const authenticate=async(req,res,next)=>{
    const token=req.headers.token;
    if(!token){
     res.send("Login Again")
    }
    try{
     var decoded = jwt.verify(token, process.env.key);
     if(decoded){
         next()
     }else{
         res.send({"msg":"LOGIN FIRST"})
     }
    }catch(err){
     res.send({"msg":err})
    }
    
 }
module.exports={auth,authenticate};