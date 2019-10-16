const products = require('./product.data');
const categories = require('../categories/category.data');

const resolvers = {
    Product: {
        category: (parent, args) => {
            try {
                const currentCategory = categories.find(item => item._id === parent.category);
                console.log(currentCategory);
                return currentCategory;
            } catch (error) {
                console.log(error);
            }
        },
    },
    Query: {
        products: () => products,
        product: (parent, args) => {
            try {
                const productReturned = products.find(item => item._id === args.id);
                return productReturned;
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        createProduct: (parent, args) => {
            try {
                const idArray = products.map(item => item._id);
                const maxId = Math.max(...idArray);
                args.product._id = maxId + 1;
                products.push(args.product);
                return args.product;
            } catch (error) {
                console.log(error);
            }
        },
        updateProduct: (parent, args) => {
            try {
                const index = products.findIndex(item => item._id === args.id);
                products[index] = args.product;
                products[index]._id = args.id;
                return products[index];
            } catch (error) {
                console.log(error);
            }
        },
        deleteProduct: (parent, args) => {
            try {
                const index = products.findIndex(item => item._id === args.id);
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
