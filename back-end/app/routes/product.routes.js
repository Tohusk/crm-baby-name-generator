/**
 * routes relating to products
 */

const { verifyProduct } = require("../middlewares");
const controller = require("../controllers/product.controller");

/**
 * POST /api/product/new
 * POST /api/product/update
 * GET /api/product/get
 * GET /api/product/getAll
 * DELETE /api/product/delete
 * @param app
 */
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.post(
        "/api/product/new",
        [
            verifyProduct.checkRequiredFields,
            verifyProduct.checkDuplicateUserProduct,
            verifyProduct.checkProductCategoryExists,
        ],
        controller.newProduct
    );

    app.post("/api/product/update", [verifyProduct.checkRequiredFieldsUpdate], controller.updateProduct);

    app.get("/api/product/get", controller.getProduct);

    app.get("/api/product/getAll", controller.getAllProducts);

    app.delete("/api/product/deleteOne", controller.deleteOneProduct);

    app.get("/api/product/getTotal", controller.getTotalProducts);
};
