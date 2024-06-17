const Product = require("../models/productModel");
const asyncHandler = require('express-async-handler')
const mongoose = require("mongoose");

//get all prodcut
const getProducts = async(req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500);
    throw new Error(error.message)
  }
};

//get product by id
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate the ID format (optional, but recommended for added safety)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message)
  }
};

//Update product by Id
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
      // Validate the ID format (optional, but recommended for added safety)
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
        return res.status(404).json(`cannot find any product with ID ${id}`)
    }
    const updateProduct = await Product.findById(id);
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500);
    throw new Error(error.message)
  }
};

//create new product
const createProduct = async(req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message)
  }
};

//delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
      // Validate the ID format (optional, but recommended for added safety)
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        return res.status(404).json(`cannot find any product with ID ${id}`)
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message)
  }
};

module.exports = {
  getProducts,
  getProduct,
  updateProduct,
  createProduct,
  deleteProduct,
};
