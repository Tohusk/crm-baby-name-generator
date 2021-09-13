/**
 * Controllers related to categories of a user
 */

const db = require("../models");
const Category = db.controller;
const mongoose = require("mongoose");

/**
 * Controller for initalise a user's category list
 */
const initialiseCategory = async (userId) => {
    await Category.findOneAndDelete({ user: userId });

    // new category
    const category = new Category({
        user: userId,
    });

    // save category
    await category.save();
};

/**
 * Controller for saving a new category
 */
const newCategory = async (req, res) => {
    try {
        // add a category to a user's category list
        await Category.findOneAndUpdate(
            {user: mongoose.Types.ObjectId(req.body.userId)},
            {
                $push: {
                    name: req.body.name,
                },
            }
        );
        res.send({message: "New category added successfully!"});
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * Controller for updating a category
 */
const updateCategory = async (req, res) => {
    try {
        await Category.findOneAndUpdate(
            {
                user: mongoose.Types.ObjectId(req.body.userId),
                name: { $elemMatch: { _id: mongoose.Types.ObjectId(req.body.categoryId) } },
            },
            {
                $set: {"name": req.body.name}
            }
        );
        res.send({ message: "Category updated successfully!" });
    } catch (err) {
        res.status(500).send({ message: err });
    }
};


/**
 * Controller to get one category
 */
const getCategory = async (req, res) => {
    try {
        const category = await Category.find({ user: mongoose.Types.ObjectId(req.query.userId) }).select({
            category: { $elemMatch: { _id: mongoose.Types.ObjectId(req.query.categoryId) } },
        });
        res.json(category);
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * Controller to get a user's category list
 */
const getAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({ user: mongoose.Types.ObjectId(req.query.userId) });
        res.json(allCategories);
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * Controller for deleting one category
 */
const deleteOneCategory = async (req, res) => {
    try {
        await Category.findOneAndUpdate(
            { user: mongoose.Types.ObjectId(req.body.userId) },
            { $pull: { name: { _id: mongoose.Types.ObjectId(req.body.categoryId) } } }
        );
        res.send({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

/**
 * Controller for deleting all category entries for a given user
 */
const deleteAllCategories = async (userId) => {
    await Category.findOneAndDelete({ user: mongoose.Types.ObjectId(userId) });
};

module.exports = {
    initialiseCategory,
    newCategory,
    updateCategory,
    getCategory,
    getAllCategories,
    deleteOneCategory,
    deleteAllCategories,
};
