/**
 * middleware that helps check if a product is valid
 */
const db = require("../models");
const Product = db.product;
/**
 * check if a duplicate product for a user is trying to be created;
 */
const checkDuplicateUserProduct = async (req, res, next) => {
    try {
        const existingProduct = await Product.findOne(
            { user: req.body.userId },
            { products: { $elemMatch: { name: req.body.name, price: req.body.price } } }
        );

        console.log(existingProduct);

        if (existingProduct["products"].length !== 0) {
            res.status(400).send({ message: "Failed! Product is already in use!" });
            return;
        }
        next();
    } catch (err) {
        res.status(500).send({ message: err });
    }
};
//
// const checkProductCategoryExists = async (req, res, next) => {
//     try {
//         const existingProduct = await Product.findOne(
//             { user: req.body.userId },
//             { products: { $elemMatch: { name: req.body.name, price: req.body.price } } }
//         );
//
//         console.log(existingProduct);
//
//         if (existingProduct["products"].length !== 0) {
//             res.status(400).send({ message: "Failed! Product is already in use!" });
//             return;
//         }
//         next();
//     } catch (err) {
//         res.status(500).send({ message: err });
//     }
// };

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

const verifyProduct = {
    checkDuplicateUserProduct,
    checkRequiredFields,
    checkRequiredFieldsUpdate,
};

module.exports = verifyProduct;
