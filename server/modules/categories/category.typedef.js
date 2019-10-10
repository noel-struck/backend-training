const { gql } = require('apollo-server-express');

const typeDef = gql`
    type Category {
        _id: ID!
        name: String
    }

    input categoryInput {
        name: String
    }

    extend type Query {
        categories: [Category]
        category(id: Int): Category
    }

    extend type Mutation {
        createCategory(category: categoryInput!): Category
        updateCategory(id: Int!, category: categoryInput!): Category
        deleteCategory(id: Int!): [Category]
    }
`

module.exports = typeDef;