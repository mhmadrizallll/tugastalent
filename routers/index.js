const { application } = require("express");
const express = require("express");
const router = express.Router();
const ProductControllers = require("../controllers/product");
const Product = require("../models").Product;

router.get("/product/create", (req, res) => {
  res.render("create");
});

// router.get("/", (req, res) => {
//   res.render("home.ejs", { products: Product });
// });

router.post("/product/create", ProductControllers.create);
router.get("/", ProductControllers.showAll);
router.get("/products", ProductControllers.showAll);
router.get("/product/edit/:id", ProductControllers.showEdit);
router.post("/product/edit/:id", ProductControllers.update);
router.get("/product/delete/:id", ProductControllers.delete);

module.exports = router;
