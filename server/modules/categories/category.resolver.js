const categoryModel = require('./category.model');
const productModel = require('../products/product.model');

const resolvers = {
    Category: {
        products: (parent, args) => {
            try {
                return productModel.find({category: parent._id});
            } catch (error) {
                console.log(error);
            }
        }
    },
    Query: {
        categories: async (parent, args) => {
            try {
                return await categoryModel.find();
            } catch (error) {
                console.log(error);
            }
        },
        category: async (parent, args) => {
            try {
                return await categoryModel.findById(args.id);
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        createCategory: async (parent, args) => {
            try {
                const categoryInstance = new categoryModel(args.category);
                return await categoryInstance.save();
            } catch (error) {
                console.log(error);
            }
        },
        updateCategory: async (parent, args) => {
            try {
                return await categoryModel.findByIdAndUpdate(args.id, args.category, {
                    new: true,
                });
            } catch (error) {
                console.log(error);
            }
        },
        deleteCategory: async (parent, args) => {
            try {
                await categoryModel.findByIdAndDelete(args.id);
                return await categoryModel.find();
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = resolvers;