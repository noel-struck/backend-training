const { gql } = require('apollo-server-express');

// Type Definition
const schema = gql`
    type Product {
        _id: ID
        title: String
        description: String
        sizes: [String]
        price: Float
        inventory: Int
        category: Category
    }

    input ProductInput {
        title: String!
        description: String
        sizes: [String]
        price: Float!
        inventory: Int
        category: String!
    }

    extend type Query {
        products: [Product]
        product(id: Int): Product
    }

    extend type Mutation {
        createProduct(product: ProductInput!): Product
        updateProduct(id: Int, product: ProductInput!): Product
        deleteProduct(id: Int): [Product]
    }
`;

module.exports = schema;
