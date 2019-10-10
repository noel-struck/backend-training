const categories = require('./category.data');

const resolvers = {
    Query: {
        categories: () => categories,
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
                const maxId = categories.reduce((a, b) => Math.max(a._id, b._id));
                console.log(maxId);
                args.category._id = maxId + 1;
                categories.push(args.category);
                return args.category;
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = resolvers;