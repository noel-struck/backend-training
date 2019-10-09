const products = require('./product.data');

const resolvers = {
    Query: {
        productList: () => products,
    },
};

module.exports = resolvers;
