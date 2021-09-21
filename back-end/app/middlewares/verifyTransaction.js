/**
 * middleware that helps check if a product is valid
 */

/**
 * check if all the required fields are filled
 */
const checkRequiredFields = (req, res, next) => {
    if (!req.body.productsPurchased) {
        res.status(400).send({ message: "Failed! Need list of products purchased!" });
        return;
    }
    if (!req.body.userId) {
        res.status(400).send({ message: "Failed! Needs to provide userId!" });
        return;
    }

    if (!req.body.contactId) {
        res.status(400).send({ message: "Failed! Needs to provide contactId!" });
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

    if (!req.body.contactId || !req.body.transactionId) {
        res.status(400).send({ message: "Failed! Needs to provide contactId or transactionId!" });
        return;
    }

    next();
};

const verifyTransaction = {
    checkRequiredFields,
    checkRequiredFieldsUpdate,
};

module.exports = verifyTransaction;
