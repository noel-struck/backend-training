const categories = require('./category.data');

const resolvers = {
    Query: {
        categories: () => {
            console.log(categories);
            return categories;
        },
        category: (parent, args) => {
            try {
                const index = categories.findIndex(item => item._id === args.id);
                console.log(index);
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
                const deleted = categories.splice(index, 1);
                console.log(deleted);
                return categories;
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = resolvers;