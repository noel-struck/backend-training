const express = require('express');
const mongoose = require('mongoose');
const { gql, ApolloServer } = require('apollo-server-express');
const productSchema = require('./modules/products/product.schema');
const categorySchema = require('./modules/categories/category.schema');
const productResolver = require('./modules/products/product.resolver');
const categoryResolver = require('./modules/categories/category.resolver');

require('dotenv').config()

// SERVER CONFIGURATION
async function startServer () {
    const app = express();

    // MongoDB Connection
    await mongoose.connect(process.env.DB_STRING, {useNewUrlParser: true});

    const typeDef = gql`
        type Query
        type Mutation
    `;

    const server = new ApolloServer({
        typeDefs: [
            typeDef, 
            productSchema,
            categorySchema
        ],
        resolvers: [
            productResolver,
            categoryResolver,
        ],
    });

    server.applyMiddleware({ app });
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server listening at http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startServer();