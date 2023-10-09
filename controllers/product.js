const fs = require("fs");
const Product = require("../models").Product;

class ProductControllers {
  static create(req, res) {
    const newProduct = {
      tag: req.body.tag,
      brand: req.body.brand,
      image: req.body.image,
      stock: Number(req.body.stock),
      price: Number(req.body.price),
    };

    Product.create(newProduct)
      .then((product) => {
        res.redirect("/products");
      })
      .catch((err) => {
        res.render("error", { error: err.message });
      });
  }

  static showAll(req, res) {
    Product.findAll()
      .then((products) => {
        res.render("home", { products });
      })
      .catch((err) => {
        res.render("error", { error: err.message });
      });
  }

  static showEdit(req, res) {
    Product.findByPk(req.params.id)
      .then((product) => {
        res.render("update", { product });
      })
      .catch((err) => {
        res.render("error", { error: err.message });
      });
  }

  static update(req, res) {
    const updatedProduct = {
      tag: req.body.tag,
      brand: req.body.brand,
      image: req.body.image,
      stock: Number(req.body.stock),
      price: Number(req.body.price),
    };
    Product.update(updatedProduct, {
      where: {
        id: req.params.id,
      },
    })
      .then((product) => {
        res.redirect("/products");
      })
      .catch((err) => {
        res.render("error", { error: err.message });
      });
  }

  static delete(req, res) {
    Product.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((products) => {
        res.redirect("/products");
      })
      .catch((err) => {
        res.render("error", { error: err.message });
      });
  }
}

module.exports = ProductControllers;
