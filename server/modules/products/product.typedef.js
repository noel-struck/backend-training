const { gql } = require('apollo-server-express');

// Type Definition
const typeDefs = gql`
    type Product {
        _id: ID
        title: String
        description: String
        sizes: [String]
        price: Float
        inventory: Int
    }

    input ProductInput {
        title: String!
        description: String
        sizes: [String]
        price: Float!
        inventory: Int
    }

    extend type Query {
        products: [Product]
        product(id: Int): Product
    }

    type Mutation {
        createProduct(product: ProductInput!): [Product]
        updateProduct(id: Int, product: ProductInput!): [Product]
        deleteProduct(id: Int): [Product]
    }
`;

module.exports = typeDefs;
