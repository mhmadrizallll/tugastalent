const fs = require("fs");
const Product = require("../models").Product;

class ProductControllers {
  static create(req, res) {
    const newProduct = {
      id: products[products.length - 1].id + 1,
      tag: req.body.tag,
      brand: req.body.brand,
      image: req.body.image,
      stok: Number(req.body.stok),
      price: Number(req.body.price),
    };

    Product.create(newProduct)
      .then((product) => {
        res.redirect("/products");
      })
      .catch((err) => {
        res.render("error", { error: err.message });
      });

    const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));

    const finalProduct = [...products, newProduct];
    fs.writeFileSync("./products.json", JSON.stringify(finalProduct, 0, 2));
    res.render("home", { products: finalProduct });
  }

  static showAll(req, res) {
    const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));
    res.render("home", { products: products });
  }

  static showEdit(req, res) {
    const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));
    const [product] = products.filter(
      (product) => product.id === Number(req.params.id)
    );

    res.render("update", { product });
  }

  static update(req, res) {
    const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));
    const oldProduct = products.filter(
      (product) => product.id !== Number(req.params.id)
    );
    const updatedProduct = {
      id: Number(req.params.id),
      tag: req.body.tag,
      brand: req.body.brand,
      image: req.body.image,
      stok: Number(req.body.stok),
      price: Number(req.body.price),
    };

    const finalProduct = [...oldProduct, updatedProduct];
    fs.writeFileSync("./products.json", JSON.stringify(finalProduct, 0, 2));
    res.render("home", { products: finalProduct });
  }

  static delete(req, res) {
    const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));
    const finalProduct = products.filter(
      (product) => product.id !== Number(req.params.id)
    );

    fs.writeFileSync("./products.json", JSON.stringify(finalProduct, 0, 2));
    res.render("home", { products: finalProduct });
  }
}

module.exports = ProductControllers;
