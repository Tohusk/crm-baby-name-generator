/**
 * routes relating to transactions
 */

const { verifyTransaction, authJwt, verifyContact } = require("../middlewares");
const controller = require("../controllers/transaction.controller");


/**
 * POST /api/transaction/new
 * POST /api/transaction/update
 * GET /api/transaction/get
 * GET /api/transaction/getAll
 * DELETE /api/transaction/delete
 * GET /api/transaction/getStats
 * @param app
 */
module.exports = function (app) {
    /*app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
*/
    app.post(
        "/api/transaction/new",
        [authJwt.verifyToken, verifyTransaction.checkRequiredFields, verifyContact.checkContactExists],
        controller.newTransaction
    );

    app.post(
        "/api/transaction/update",
        [authJwt.verifyToken, verifyTransaction.checkRequiredFieldsUpdate, verifyContact.checkContactExists],
        controller.updateTransaction
    );

    app.get("/api/transaction/get", [authJwt.verifyToken], controller.getTransaction);

    app.get("/api/transaction/getAll", [authJwt.verifyToken], controller.getAllTransactions);

    app.delete("/api/transaction/deleteOne", [authJwt.verifyToken], controller.deleteOneTransaction);

    app.get("/api/transaction/getStats", [authJwt.verifyToken], controller.getSalesStats);
};
