const mongoose = require("mongoose");
const HEX_COLOUR_CODE_LEN = 7;
/**
 * model for a product's category
 */
const Category = mongoose.model(
    "Category",
    new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
        categories: [
            {
                name: {
                    type: String,
                    required: true,
                },
                colour: {
                    type: String,
                    required: true,
                    maxLength: HEX_COLOUR_CODE_LEN,
                },
            },
        ],
    })
);

module.exports = Category;
