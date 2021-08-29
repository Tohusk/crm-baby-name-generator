/**
 * routes relating to contacts
 */

const { verifyNewContact, verifySignUp} = require("../middlewares");
const controller = require("../controllers/contact.controller");

/**
 * POST /api/contact/new
 * POST /api/contact/update
 * POST /api/contact/get
 * POST /api/contact/getAll
 * @param app
 */
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/contact/new",
        [
            verifySignUp.checkRequiredFields
        ],
        controller.new
    );

    app.post(
        "/api/contact/update",
        [
            verifySignUp.checkRequiredFields
        ],
        controller.update
    );

    app.get("/api/contact/get", controller.get);

    app.get("/api/contact/getAll", controller.getAll);
};