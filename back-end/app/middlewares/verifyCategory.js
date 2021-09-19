/**
 * middleware that helps check if a category is valid
 */
const db = require("../models");
const Category = db.category;
/**
 * check if a duplicate category for a user is trying to be created;
 */
const checkDuplicateUserCategory = async (req, res, next) => {
    try {
        const existingCategory = await Category.findOne(
            { user: req.body.userId },
            { categories: { $elemMatch: { name: req.body.name } } }
        );

        console.log(existingCategory);

        if (existingCategory["categories"].length !== 0) {
            res.status(400).send({ message: "Failed! Category is already in use!" });
            return;
        }
        next();
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

const verifyContact = {
    checkDuplicateUserCategory,
    checkRequiredFields,
    checkRequiredFieldsUpdate,
};

module.exports = verifyContact;
