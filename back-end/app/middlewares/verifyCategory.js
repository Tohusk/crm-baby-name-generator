/**
 * middleware that helps check if a category is valid
 */
const db = require("../models");
const User = db.user;
/**
 * check if a duplicate category for a user is trying to be created
 */
checkDuplicateUserCategory = (req, res, next) => {
    // user
    User.findOne({
        username: req.body.user
    }).exec((err, user) => {
        User.findOne({
            name: req.body.name
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message: "Failed! Category already created!" });
                return;
            }

            next();
        });
    });
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

    next();
};

const checkRequiredFieldsUpdate = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Failed! Need contact name!" });
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