const express = require('express');
const { gql, ApolloServer } = require('apollo-server-express');
const productTypeDef = require('./modules/products/product.typedef');
const categoryTypeDef = require('./modules/categories/category.typedef');
const productResolver = require('./modules/products/product.resolver');

require('dotenv').config()

// SERVER CONFIGURATION
function startServer () {
    const app = express();

    const typeDef = gql`
        type Query
        type Mutation
    `;

    const server = new ApolloServer({
        typeDefs: [
            typeDef, 
            productTypeDef,
            categoryTypeDef
        ],
        resolvers: [
            productResolver
        ],
    });

    server.applyMiddleware({ app });
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server listening at http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startServer();