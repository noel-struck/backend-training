const express = require('express');
const { gql, ApolloServer } = require('apollo-server-express');

// const typeDefs = require('./typedefs');
// const productTypedefs = require('./modules/products/product.typedef');

require('dotenv').config()

// Dummy Data
const products = [
    {
        _id: 1,
        title: 'My first product',
        description: 'Ullamco reprehenderit culpa commodo occaecat irure ipsum exercitation deserunt irure officia est amet aliquip et.',
        sizes: ['S', 'M', 'L'],
        price: 10,
        inventory: 100,
    },
    {
        _id: 2,
        title: 'My second product',
        description: 'Ullamco reprehenderit culpa commodo occaecat irure ipsum exercitation deserunt irure officia est amet aliquip et.',
        sizes: ['S'],
        price: 100,
        inventory: 50,
    },
    {
        _id: 3,
        title: 'My third product',
        description: 'Ullamco reprehenderit culpa commodo occaecat irure ipsum exercitation deserunt irure officia est amet aliquip et.',
        sizes: ['L'],
        price: 50,
        inventory: 200,
    },
    {
        _id: 4,
        title: 'A really big product',
        description: 'Ullamco reprehenderit culpa commodo occaecat irure ipsum exercitation deserunt irure officia est amet aliquip et.',
        sizes: ['XL'],
        price: 1000,
        inventory: 3,
    },
    {
        _id: 5,
        title: 'The smallest product',
        description: 'Ullamco reprehenderit culpa commodo occaecat irure ipsum exercitation deserunt irure officia est amet aliquip et.',
        sizes: ['XS'],
        price: 99.99,
        inventory: 1,
    },
];

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

    type Query {
        products: [Product]
        product(id: Int): Product
    }

    type Mutation {
        createProduct(product: ProductInput!): [Product]
        updateProduct(id: Int, product: ProductInput!): [Product]
        deleteProduct(id: Int): [Product]
    }
`;

const resolvers = {
    Query: {
        products: () => products,
        product: (parent, params) => {
            try {
                const productReturned = products.find(item => item._id === params.id);
                return productReturned;
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        createProduct: (parent, params) => {
            try {
                const idArray = products.map(item => item._id);
                const maxId = Math.max(...idArray);
                params.product._id = maxId + 1;
                console.log('new product: ', params.product);
                products.push(params.product);
                return products;
            } catch (error) {
                console.log(error);
            }
        },
        updateProduct: (parent, params) => {
            try {
                const index = products.findIndex(item => item._id === params.id);
                products[index] = params.product;
                return products;
            } catch (error) {
                console.log(error);
            }
        },
        deleteProduct: (parent, params) => {
            try {
                const index = products.findIndex(item => item._id === params.id);
                const deleted = products.splice(index, 1);
                console.log(deleted);
                return products;
            } catch (error) {
                console.log(error);
            }
        }
    }
}



// SERVER CONFIGURATION
function startServer () {
    const app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    server.applyMiddleware({ app });
    console.log(process.env.PORT);
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server listening at http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startServer();