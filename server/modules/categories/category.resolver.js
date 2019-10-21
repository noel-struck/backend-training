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
                const data = await categoryModel.find();
                console.log(data);
                return data;
            } catch (error) {
                console.log(error);
            }
        },
        category: async (parent, args) => {
            try {
                const data = await categoryModel.findById(args.id);
                console.log(data);
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        createCategory: async (parent, args) => {
            try {
                const categoryInstance = new categoryModel(args.category);
                const categorySaved = await categoryInstance.save();
                console.log(categorySaved);
                return categorySaved;
            } catch (error) {
                console.log(error);
            }
        },
        updateCategory: async (parent, args) => {
            try {
                const data = await categoryModel.findByIdAndUpdate(args.id, args.category, {
                    new: true,
                });
                console.log(data);
                return data;
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