const { gql } = require('apollo-server-express');


const typeDef = gql`
    type Category {
        _id: ID!
        name: String
    }

    type Query {
        categories: [Category]
        category(id: Int): Category
    }
`