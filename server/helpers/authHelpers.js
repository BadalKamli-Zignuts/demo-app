const bcrypt = require("bcrypt");

// Hash the provided password using bcrypt
const hashPassword = async (passwordInput) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(passwordInput, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(
      `Error in /server/helper/authHelpers.js --> hashPassword fn : ${error}`
    );
  }
};

// Compare the provided password with the hashed password using bcrypt
const comparePassword = async (passwordInput, hashedPassword) => {
  try {
    return bcrypt.compare(passwordInput, hashedPassword);
  } catch (error) {
    console.log(
      `Error in /server/helper/authHelpers.js --> comparePassword fn : ${error}`
    );
  }
};

module.exports = {
  hashPassword,
  comparePassword
};
