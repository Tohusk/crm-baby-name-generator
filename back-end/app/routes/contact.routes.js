/**
 * routes relating to contacts
 */

const { verifyContact, authJwt } = require("../middlewares");
const controller = require("../controllers/contact.controller");

/**
 * POST /api/contact/new
 * POST /api/contact/update
 * GET /api/contact/get
 * GET /api/contact/getAll
 * GET /api/contact/getContactStatistics
 * GET /api/contact/getUserAvgRating
 * GET /api/contact/getByName
 * DELETE /api/contact/delete
 */
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.post("/api/contact/new", [authJwt.verifyToken, verifyContact.checkRequiredFields], controller.newContact);

    app.post("/api/contact/update", [authJwt.verifyToken, verifyContact.checkRequiredFieldsUpdate], controller.updateContact);

    app.get("/api/contact/get", [authJwt.verifyToken], controller.getContact);

    app.get("/api/contact/getAll", [authJwt.verifyToken], controller.getAllContacts);

    app.get("/api/contact/getContactStatistics", [authJwt.verifyToken], controller.getContactStatistics);

    app.get("/api/contact/getUserAvgRating", [authJwt.verifyToken], controller.getUserAvgRating);

    app.get("/api/contact/getByName", [authJwt.verifyToken], controller.getContactByName);

    app.delete("/api/contact/deleteOne", [authJwt.verifyToken], controller.deleteOneContact);
};
