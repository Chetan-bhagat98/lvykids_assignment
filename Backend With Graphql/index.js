const {connection}=require('./Config/db');
const { ApolloServer,gql}=require('apollo-server');
const {ApolloServerPluginLandingPageGraphQLPlayground} =require('apollo-server-core') ;
const {resolvers}=require('./resolver')
const {typeDefs}=require('./typedefs')



const server =new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[ApolloServerPluginLandingPageGraphQLPlayground()]

});

server.listen().then(({url})=>{
console.log(`🚀 server is running at ${url}`)
})


