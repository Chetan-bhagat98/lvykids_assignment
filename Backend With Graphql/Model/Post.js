const mongoose=require("mongoose");
const Schema=mongoose.Schema

const postSchema = new Schema({
    postby:{
        type:String,
        require:true
     },
    Images: {
      type: [String],
      validate: {
        validator: function(Images) {
          return Images.length <= 10;
        },
        message: 'Array length exceeds the maximum allowed limit.'
      }
    },
    caption: {
      type: String,
      require:true
    },
    comments: {
        type: [String],
      },
    date:{
        type:Date,
        default:Date.now()
        
    },
    like:{
      type:Number,
      default:0
    }
  });

const postModel=mongoose.model("UserPost",postSchema);

module.exports={postModel};