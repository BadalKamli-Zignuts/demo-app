const express = require("express");
const {
  registerController,
  loginController,
  testController,
  updateProfileController,
} = require("../controllers/authControllers");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

// Create a router
const router = express.Router();

// Register
router.post("/register", registerController);

// Login
router.post("/login", loginController);

// Test routes (Requires Sign In and Admin)
router.get("/test", requireSignIn, isAdmin, testController);

// Protected route (Requires Sign In)
router.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected route - admin (Requires Sign In and Admin)
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});


module.exports = router;
