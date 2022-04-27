const router = require("express").Router();
const { auth } = require("../middleware/auth");
const { authAdmin } = require("../middleware/authAdmin");
const productCtrl = require("../controllers/productCtrl");
router.get("/getProducts", productCtrl.getAllProduct);
router.get("/getProduct/:id", productCtrl.detailProduct);
router.post("/createProduct", productCtrl.createProduct);
router.patch("/review/:id", productCtrl.reviews);
module.exports = router;
