const express = require("express");
const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware");
const {
  categoryControlller,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} = require("./../controllers/categoryController.js");

const router = express.Router();

// Routes for category management

// Create a new category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// Update an existing category by ID
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// Get all categories
router.get("/get-category", categoryControlller);

// Get details of a single category by slug
router.get("/single-category/:slug", singleCategoryController);

// Delete a category by ID
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

module.exports = router;
