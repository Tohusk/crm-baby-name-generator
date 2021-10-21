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

    for (const p of req.body.productsPurchased) {
        if (!p.price) {
            res.status(400).send({ message: "Failed! Need to provide price!" });
            return;
        }
    }

    next();
};

const checkRequiredFieldsUpdate = (req, res, next) => {
    if (!req.body.productsPurchased || req.body.productsPurchased.length === 0) {
        res.status(400).send({ message: "Failed! Need list of products purchased!" });
        return;
    }

    if (!req.body.userId) {
        res.status(400).send({ message: "Failed! Needs to provide user!" });
        return;
    }

    if (!req.body.contactId) {
        res.status(400).send({ message: "Failed! Need to provide contactId!" });
        return;
    }

    if (!req.body.transactionId) {
        res.status(400).send({ message: "Failed! Need to provide transactionId!" });
        return;
    }

    for (const p of req.body.productsPurchased) {
        if (!p.price) {
            res.status(400).send({ message: "Failed! Need to provide price!" });
            return;
        }
    }

    next();
};

const verifyTransaction = {
    checkRequiredFields,
    checkRequiredFieldsUpdate,
};

module.exports = verifyTransaction;
