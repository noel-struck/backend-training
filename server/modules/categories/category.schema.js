const { gql } = require('apollo-server-express');

const schema = gql`
    "A type where you define the categories for products, you could have manhy products for a single category"
    type Category {
        _id: ID!
        name: String
        products: [Product]
    }

    input CategoryInput {
        name: String
    }

    type CategoryCreated {
        _id: ID
        name: String
    }

    extend type Query {
        categories: [Category]
        category(id: String!): Category
    }

    extend type Mutation {
        createCategory(category: CategoryInput!): CategoryCreated
        updateCategory(id: String!, category: CategoryInput!): Category
        deleteCategory(id: String!): [Category]
    }
`

module.exports = schema;