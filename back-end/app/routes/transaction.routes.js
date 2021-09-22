/**
 * routes relating to transactions
 */

const { verifyTransaction } = require("../middlewares");
const controller = require("../controllers/transaction.controller");

const { verifyContact } = require("../middlewares");

/**
 * POST /api/transaction/new
 * POST /api/transaction/update
 * GET /api/transaction/get
 * GET /api/transaction/getAll
 * DELETE /api/transaction/delete
 * @param app
 */
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.post(
        "/api/transaction/new",
        [verifyTransaction.checkRequiredFields, verifyContact.checkContactExists],
        controller.newTransaction
    );

    app.post(
        "/api/transaction/update",
        [verifyTransaction.checkRequiredFieldsUpdate, verifyContact.checkContactExists],
        controller.updateTransaction
    );

    app.get("/api/transaction/get", controller.getTransaction);

    app.get("/api/transaction/getAll", controller.getAllTransactions);

    app.delete("/api/transaction/deleteOne", controller.deleteOneTransaction);
};