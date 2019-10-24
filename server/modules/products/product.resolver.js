const productModel = require('./product.model');

const resolvers = {
    Query: {
        products: async (parent, args) => {
            try {
                return await productModel.find().populate('category');
            } catch (error) {
                console.log(error);
            }
        },
        product: async (parent, args) => {
            try {
                return await productModel.findById(args.id).populate('category');
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        createProduct: async (parent, args) => {
            try {
                const productInstance = new productModel(args.product);
                const productCreated = await productInstance.save();
                return productModel
                        .findById(productCreated._id)
                        .populate('category');
            } catch (error) {
                console.log(error);
            }
        },
        updateProduct: async (parent, args) => {
            try {
                return await productModel.findByIdAndUpdate(args.id, args.product, {
                    new: true
                })
            } catch (error) {
                console.log(error);
            }
        },
        deleteProduct: async (parent, args) => {
            try {
                await productModel.findByIdAndDelete(args.id);
                return await productModel.find();
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = resolvers;
