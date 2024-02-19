const express = require("express");
const {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  productCategoryController,
} = require("../controllers/productController.js");

const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware.js");
const formidable = require("express-formidable");

const router = express.Router();

// Routes for product management

// Create a new product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// Update an existing product by product ID
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// Get all products
router.get("/get-product", getProductController);

// Get details of a single product by slug
router.get("/get-product/:slug", getSingleProductController);

// Get photo of a product by product ID
router.get("/product-photo/:pid", productPhotoController);

// Delete a product by product ID
router.delete("/delete-product/:pid", deleteProductController);

// Filter products based on criteria
router.post("/product-filters", productFiltersController);

// Get total count of products
router.get("/product-count", productCountController);

// Get a list of products based on the page
router.get("/product-list/:page", productListController);

// Search products based on keyword
router.get("/search/:keyword", searchProductController);

// Get products based on category
router.get('/product-category/:slug', productCategoryController);

module.exports = router;
