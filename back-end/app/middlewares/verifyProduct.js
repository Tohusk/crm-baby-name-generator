const db = require("../models");
const Product = db.product;
const Transaction = db.transaction;

const verifyCategory = require("./verifyCategory");
/**
 * check if a duplicate product for a user is trying to be created;
 */
const checkDuplicateUserProduct = async (req, res, next) => {
    try {
        const existingProduct = await Product.findOne(
            { user: req.body.userId },
            { products: { $elemMatch: { name: req.body.name, price: req.body.price } } }
        );

        if (existingProduct["products"].length !== 0) {
            res.status(400).send({ message: "Failed! Product is already in use!" });
            return;
        }
        next();
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * checks if product is being inserted in a category that does not exist
 */
const checkProductCategoryExists = async (req, res, next) => {
    try {
        if (!req.body.categoryId || (await verifyCategory.checkCategoryExists(req, res))) next();
        else res.status(400).send({ message: "Failed! Trying to insert product in a category that does not exist!" });
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * check if all the required fields are filled
 */
const checkRequiredFields = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Failed! Need product name!" });
        return;
    }
    if (!req.body.userId) {
        res.status(400).send({ message: "Failed! Needs to provide userId!" });
        return;
    }

    if (!req.body.price) {
        res.status(400).send({ message: "Failed! Needs to provide price!" });
        return;
    }

    next();
};

/**
 * check if required fields are filled when updating the contacts
 */
const checkRequiredFieldsUpdate = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Failed! Need product name!" });
        return;
    }

    if (!req.body.price) {
        res.status(400).send({ message: "Failed! Need product price!" });
        return;
    }

    if (!req.body.userId || !req.body.productId) {
        res.status(400).send({ message: "Failed! Needs to provide userId or productId!" });
        return;
    }

    next();
};

/**
 * checks if the product is being referenced in a transaction
 */
const checkProductNotInUse = async (req, res, next) => {
    try {
        const allTransactions = await Transaction.findOne({ user: req.body.userId });

        for (const t of allTransactions.transactions) {
            for (const p of t.productsPurchased) {
                if (p.productId.toString() == req.body.productId.toString()) {
                    res.status(400).send({ message: "Failed! This product is in use by one or more transactions" });
                    return;
                }
            }
        }
        next();
    } catch (err) {
        res.status(500).send({ message: err });
    }
}


const verifyProduct = {
    checkDuplicateUserProduct,
    checkRequiredFields,
    checkRequiredFieldsUpdate,
    checkProductCategoryExists,
    checkProductNotInUse,
};

module.exports = verifyProduct;
