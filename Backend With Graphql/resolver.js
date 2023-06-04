const { registermodel } = require("./Model/register");
const { postModel } = require("./Model/Post");
const { argv } = require("process");

const resolvers = {
    Query: {
        users: async () => {
            var data = await registermodel.find();
            return data
        },
        userbyID: async (parent, argv, context, info) => {
            const id = argv.id;
            return await registermodel.findById(id)
        },
        postbypagination: async (parent, argv, context, info) => {
            const { pageNo, limit } = argv;
            const skip = (pageNo - 1) * limit;
            var data = await postModel.find().skip(skip).limit(limit);
            if(data){
                return data
            }else{
                return "Something Went Wrong"
            }
        }

    },
    Mutation: {
        createUser: async (parent, argv, context, info) => {
            const { author, caption, image, email, password } = argv.post;
            const post = new registermodel({ author, caption, image, email, password })
            await post.save();
            return post
        },
        createPost: async (parent, argv, context, info) => {
            const { postby, Images, caption, comments } = argv.post;
            const post = new postModel({ postby, Images, caption, comments })
            await post.save();
            return post
        },
        updateCaption: async (parent, argv, context, info) => {
            const { id, caption } = argv;
            const result = await postModel.findByIdAndUpdate({ _id: id }, { caption: caption })

            if (result) {
                return `Caption of postid ${id} Updated`
            } else {
                return `Invalid ID`
            }
        },
        deletePost: async (parent, argv, context, info) => {
            const { id } = argv;
            const result = await postModel.findByIdAndDelete({ _id: id });

            if (result) {
                return `Post of ID ${id} deleted`
            } else {
                return `Invalid ID`
            }
        },
        addComment: async (parent, argv, context, info) => {
            const { id, comment } = argv;
            const post = await postModel.findById({ _id: id });
            if (!post) {
                return `Invalid ID`
            }
            var all_comment = post.comments;
            all_comment.push(comment);
            let result = await postModel.findByIdAndUpdate({ _id: id }, { comments: all_comment })
            if (result) {
                return `Comment Added`
            } else {
                return `Invalid ID`
            }

        },
        likePost: async (parent, argv, context, info) => {
            const { id } = argv;
            const result = await postModel.findByIdAndUpdate({ _id: id }, { $inc: { like: 1 } });

            if (result) {
                return `Post liked`
            } else {
                return `Invalid ID`
            }

        },
        unlikePost: async (parent, argv, context, info) => {
            const { id } = argv;
            const result = await postModel.findByIdAndUpdate({ _id: id }, { $inc: { like: -1 } });
            if (result) {
                return `Post unliked`
            } else {
                return `Invalid ID`
            }
        },

    }

}

module.exports = { resolvers }