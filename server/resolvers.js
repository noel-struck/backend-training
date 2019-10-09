const ProductResolver = require('./modules/products/product.resolver');

const resolverMap = {
    Query: {
        ...ProductResolver.Query,
    },
};


module.exports = resolverMap;
