const categories = require('./category.data');
const products = require('../products/product.data');

const resolvers = {
    Category: {
        products: (parent, args) => {
            try {
                return products.filter(item => item.category === parent._id);
            } catch (error) {
                console.log(error);
            }
        }
    },
    Query: {
        categories: () => categories,
        category: (parent, args) => {
            try {
                const index = categories.findIndex(item => item._id === args.id);
                return categories[index];
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        createCategory: (parent, args) => {
            try {
                const idArray = categories.map(item => item._id);
                const maxId = Math.max(...idArray);
                args.category._id = maxId + 1;
                categories.push(args.category);
                return args.category;
            } catch (error) {
                console.log(error);
            }
        },
        updateCategory: (parent, args) => {
            try {
                const index = categories.findIndex(item => item._id === args.id);
                categories[index] = args.category;
                categories[index]._id = args.id;
                return categories[index];
            } catch (error) {
                console.log(error);
            }
        },
        deleteCategory: (parent, args) => {
            try {
                const index = categories.findIndex(item => item._id === args.id);
                categories.splice(index, 1);
                return categories;
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = resolvers;