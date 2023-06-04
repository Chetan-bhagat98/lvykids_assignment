const { gql}=require('apollo-server');

const typeDefs=gql`
type Query{
    users:[User]
    post:[Post]
    userbyID(id:ID):User
    postbypagination(pageNo:Int!,limit:Int!):[Post] 
}
type User{
    id:ID
    author:String
    caption:String
    image:String
    email:String
    password:String
}
type Post{
    id:ID
    postby:String
    Images:[String]
    caption:String 
    comments:[String]
    data:String
}
input postInput{
    postby:String!
    Images:[String!]!
    caption:String !
    comments:[String!]!
}
input userInput{
    author:String!
    caption:String!
    Images:String!
    email:String!
    password:String!
}
type Mutation{
    createUser(post: userInput):User
    createPost(post: postInput):Post
    updateCaption(id:ID!,caption:String! ):String
    deletePost(id:ID! ):String
    addComment(id:ID!,comment:String! ):String
    likePost(id:ID! ):String
    unlikePost(id:ID! ):String
    
    
}

`

module.exports={typeDefs}