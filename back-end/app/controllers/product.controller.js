/**
 * Controllers related to products of a user
 */

const db = require("../models");
const Product = db.product;
const mongoose = require("mongoose");

/**
 * Controller for initalise a user's product list
 */
const initialiseProduct = async (userId) => {
    await Product.findOneAndDelete({ user: userId });

    // new product
    const product = new Product({
        user: userId,
    });

    // save product
    await product.save();
};

/**
 * Controller for saving a new product
 */
const newProduct = async (req, res) => {
    try {
        const newProduct = { name: req.body.name, price: req.body.price, categoryId: req.body.categoryId };
        // add a product to a user's product list
        await Product.findOneAndUpdate(
            { user: mongoose.Types.ObjectId(req.body.userId) },
            {
                $push: {
                    products: newProduct,
                },
            }
        );
        res.send({ message: "New product added successfully!" });
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * Controller for updating a product
 */
const updateProduct = async (req, res) => {
    try {
        await Product.findOneAndUpdate(
            {
                user: mongoose.Types.ObjectId(req.body.userId),
                products: { $elemMatch: { _id: mongoose.Types.ObjectId(req.body.productId) } },
            },
            {
                $set: {
                    "products.$.name": req.body.name,
                    "products.$.price": req.body.price,
                    "products.$.categoryId": req.body.categoryId,
                },
            }
        );
        res.send({ message: "Product updated successfully!" });
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * Controller to get one product
 */
const getProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ user: mongoose.Types.ObjectId(req.query.userId) }).select({
            products: { $elemMatch: { _id: mongoose.Types.ObjectId(req.query.productId) } },
        });
        res.json(product.products[0]);
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * Controller to get a user's product list
 */
const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.findOne({ user: mongoose.Types.ObjectId(req.query.userId) });
        res.json(allProducts.products);
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * Controller for deleting one product
 */
const deleteOneProduct = async (req, res) => {
    try {
        await Product.findOneAndUpdate(
            { user: mongoose.Types.ObjectId(req.body.userId) },
            { $pull: { products: { _id: mongoose.Types.ObjectId(req.body.productId) } } }
        );
        res.send({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * Controller for deleting all product entries for a given user
 */
const deleteAllProducts = async (userId) => {
    await Product.findOneAndDelete({ user: mongoose.Types.ObjectId(userId) });
};

/**
 * Controller to get a user's product list
 */
const getTotalProducts = async (req, res) => {
    try {
        const allProducts = await Product.findOne({ user: mongoose.Types.ObjectId(req.query.userId) });
        const total = allProducts.products.length.toString();
        res.send(total);
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

module.exports = {
    initialiseProduct,
    newProduct,
    updateProduct,
    getProduct,
    getAllProducts,
    deleteOneProduct,
    deleteAllProducts,
    getTotalProducts,
};
