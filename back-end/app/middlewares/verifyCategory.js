const db = require("../models");
const mongoose = require("mongoose");
const Category = db.category;
const Product = db.product;

/**
 * check if a duplicate category for a user is trying to be created;
 */
const checkDuplicateUserCategory = async (req, res, next) => {
    try {
        if (await checkCategoryExists(req, res)) {
            res.status(400).send({ message: "Failed! Category is already in use!" });
            return;
        }
        next();
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * searches for a categoryId or category name in a user's category list. Returns true if it does exist
 */
const checkCategoryExists = async (req, res) => {
    try {
        const existingCategory = await Category.findOne(
            { user: req.body.userId },
            {
                categories: {
                    $elemMatch: {
                        $or: [{ name: req.body.name }, { _id: mongoose.Types.ObjectId(req.body.categoryId) }],
                    },
                },
            }
        );

        return existingCategory["categories"].length !== 0;
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * check if all the required fields are filled
 */
const checkRequiredFields = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Failed! Need category name!" });
        return;
    }
    if (!req.body.userId) {
        res.status(400).send({ message: "Failed! Needs to provide userId!" });
        return;
    }

    if (!req.body.colour) {
        res.status(400).send({ message: "Failed! Needs to provide colour!" });
        return;
    }

    next();
};

/**
 * checks if the required fields have been filled when updating a category
 */
const checkRequiredFieldsUpdate = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Failed! Need category name!" });
        return;
    }

    if (!req.body.colour) {
        res.status(400).send({ message: "Failed! Need category colour!" });
        return;
    }

    if (!req.body.userId || !req.body.categoryId) {
        res.status(400).send({ message: "Failed! Needs to provide userId or categoryId!" });
        return;
    }

    next();
};

/**
 * checks if the category is not being used by a product
 */
const checkCategoryNotInUse = async (req, res, next) => {
    try {
        const allProducts = await Product.findOne({ user: req.body.userId });

        for (const p of allProducts.products) {
            if (p.categoryId && p.categoryId.toString() === req.body.categoryId.toString()) {
                res.status(400).send({ message: "Failed! This category is in use by one or more products" });
                return;
            }
        }
        next();
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

const verifyCategory = {
    checkDuplicateUserCategory,
    checkRequiredFields,
    checkRequiredFieldsUpdate,
    checkCategoryExists,
    checkCategoryNotInUse,
};

module.exports = verifyCategory;
