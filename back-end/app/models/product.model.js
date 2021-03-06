const mongoose = require("mongoose");
/**
 * model for a product
 */
const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
        products: [
            {
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                categoryId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Category",
                },
            },
        ],
    })
);

module.exports = Product;
