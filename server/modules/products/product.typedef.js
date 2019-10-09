const { gql } = require('apollo-server');

const product = gql`
    type Product {
        title: String
        description: String
        sizes: [String]
        price: Number
        inventory: Number
    }

    type Query {
        productList: [Product]
    }
`;

module.exports = product;
