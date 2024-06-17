const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const { getProducts, getProduct, updateProduct, createProduct, deleteProduct } = require("../controllers/productController");

// get all products
router.get("/", getProducts);

// search by id
router.get("/:id", getProduct);

//update a product
router.put("/:id", updateProduct);

// add product
router.post("/", createProduct);

//delete product
router.delete("/:id", deleteProduct);

module.exports = router;
