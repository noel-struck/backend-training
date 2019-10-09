const express = require('express');
const { gql, ApolloServer } = require('apollo-server-express');
const typeDefs = require('./modules/products/product.typedef');
const resolvers = require('./modules/products/product.resolver');

// const typeDefs = require('./typedefs');
// const productTypedefs = require('./modules/products/product.typedef');

require('dotenv').config()

// SERVER CONFIGURATION
function startServer () {
    const app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    server.applyMiddleware({ app });
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server listening at http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startServer();