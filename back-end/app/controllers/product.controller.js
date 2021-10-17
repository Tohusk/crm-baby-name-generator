/**
 * Controllers related to products of a user
 */

const db = require("../models");
const Product = db.product;
const mongoose = require("mongoose");
const transactionController = require("./transaction.controller");

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
        const product = await getOneProduct(req.query.userId, req.query.productId);
        res.json(product.products[0]);
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * function that contains the logic of getting one product from db
 */
const getOneProduct = async (userId, productId) => {
    const oneProduct = await Product.findOne({ user: userId }).select({
        products: { $elemMatch: { _id: productId } },
    });
    return oneProduct;
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

/**
 * Controller that gets the best selling products from the past 7 days
 */
const getMostPopularProduct = async (req, res) => {
    try {
        const productPopularityStats = await findProductPopularityStats(req.query.userId);
        res.json(productPopularityStats.mostPopularProduct);
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * function that finds stats related to product popularity
 */
const findProductPopularityStats = async (userId) => {
    const transactions = await transactionController.getAllTransactionsForUser(userId);

    // find most popular product and
    let mostPopularCount = 0;
    let mostPopularProduct;
    let productPopularityMap = new Map();

    for (const t of transactions) {
        for (const p of t.productsPurchased) {
            if (!productPopularityMap.get(p.productId.toString())) {
                productPopularityMap.set(p.productId.toString(), p.quantity);
            } else {
                productPopularityMap.set(
                    p.productId.toString(),
                    productPopularityMap.get(p.productId.toString()) + p.quantity
                );
            }

            if (productPopularityMap.get(p.productId.toString()) > mostPopularCount) {
                mostPopularCount = productPopularityMap.get(p.productId.toString());
                mostPopularProduct = p.productId;
            }
        }
    }

    const product = await getOneProduct(userId, mostPopularProduct);

    const popularityStats = {
        mostPopularProduct: product.products[0],
        popularityMap: productPopularityMap,
    };
    return popularityStats;
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
    getMostPopularProduct,
};
