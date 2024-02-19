const JWT = require("jsonwebtoken");
const UserModel = require("../models/userModel");

//Protecting routes based on token
const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );
    //pass this token to user
    req.user = decode;
    next();
  } catch (error) {
    console.log(
      `Error in /server/authMiddleware --> requireSignIn fn : ${error}`
    );
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    //Check the role
    if (user.role !== 1) {
      return res.status().send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(`Error in /server/authMiddleware --> isAdmin fn : ${error}`);
    res.status(401).send({
      success: false,
      message: `Error in authMiddleware --> isAdmin fn`,
      error,
    });
  }
};

module.exports = {
  requireSignIn,
  isAdmin,
};
