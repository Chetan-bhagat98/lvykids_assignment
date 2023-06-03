const mongoose=require("mongoose");
const Schema=mongoose.Schema

const userSchema = new Schema({
    author: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      require:true
    },
    image:{
        type:String,
        require:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/
    },
    password:{
        type: String,
        required: true,
    }
  });

const registermodel=mongoose.model("UserRegister",userSchema);

module.exports={registermodel};