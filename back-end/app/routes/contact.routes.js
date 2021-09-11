/**
 * routes relating to contacts
 */

const { verifyContact } = require("../middlewares");
const controller = require("../controllers/contact.controller");

/**
 * POST /api/contact/new
 * POST /api/contact/update
 * GET /api/contact/get
 * GET /api/contact/getAll
 * @param app
 */
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/contact/new", [verifyContact.checkRequiredFields], controller.newContact);

  // app.post(
  //     "/api/contact/update",
  //     [
  //         verifyContact.checkRequiredFields
  //     ],
  //     controller.updateContact
  // );

  app.get("/api/contact/get", controller.getContact);

  app.get("/api/contact/getAll", controller.getAllContacts);
};
