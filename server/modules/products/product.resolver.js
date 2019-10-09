const products = require('./product.data');

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

module.exports = resolvers;
