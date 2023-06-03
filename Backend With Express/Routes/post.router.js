const { postModel } = require("../Model/Post");
const { auth,authenticate } = require("../Middlewares/authenticate")
const express = require("express");
const app = express()
const postroute = express.Router();



// NEW POST USER (Create a new post with images/videos (max 10), caption, and other relevant details)

postroute.post("/api/post", auth, async (req, res) => {
    var payload = req.body;
    console.log(payload)
    var data = await new postModel(payload);
    await data.save()
    res.status(200).send("New Post Added")
})

//Edit caption of post

postroute.patch("/api/post/:postID", auth, async (req, res) => {
    var postID = req.params.postID;

    var newcaption = req.body.caption;

    var data = await postModel.findByIdAndUpdate({ _id: postID }, { caption: newcaption });
    if (data) {
        res.status(200).send("Caption Edited")
    }else{
        res.status(400).send("Caption Not found")
    }

})

//Delete a post

postroute.delete("/api/post/:postID", auth, async (req, res) => {
    var postID = req.params.postID;

    var data = await postModel.findByIdAndDelete({ _id: postID });

    if (data) {
        res.status(200).send("Post Deleted")
    }else{
        res.status(400).send("Caption Not found")
    }
});

//Add comment to the post

postroute.patch("/api/post/comment/:postID", authenticate, async (req, res) => {
    var payload = req.body;

    var postID = req.params.postID;

    var post = await postModel.find({ _id: postID });

    var allcomment = post[0].comments;

    allcomment.push(payload.newcomment)

    var data = await postModel.findByIdAndUpdate({ _id: postID }, { comments: allcomment });
    if (data) {
        res.status(200).send("Added new comment")
    } else {
        res.status(400).send("Post Not found")
    }

});

// Like post 

postroute.patch("/api/like/:postID", authenticate, async (req, res) => {
    var postID = req.params.postID;
    
    var data = await postModel.findByIdAndUpdate({ _id: postID }, { $inc: { like: 1 } });

    if (data) {
        res.status(200).send("Liked")
    }else{
        res.status(400).send("Internal Error ")
    }
   

})
// unlike post 

postroute.patch("/api/unlike/:postID", authenticate, async (req, res) => {
    var postID = req.params.postID;

    var data = await postModel.findByIdAndUpdate({ _id: postID }, { $inc: { like: -1 } });

    if (data) {
        res.status(200).send("unlike")
    }else{
        res.status(400).send("Internal Error ")
    }
   
});

// Pagination all post  example==>  /api/post?page=2&limit=5;

postroute.get("/api/post", auth, async (req, res) => {
    var limit=req.query.limit || 1
    var page=req.query.page || 5
    const skip = (page - 1) * limit;
    var data = await  postModel.find().skip(skip).limit(limit);
    res.status(200).send(data)
})
module.exports = { postroute }