const authModel = require("../model/authModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'secreTkey123';

module.exports.signupUser = async (userDetails) => {
  try {
    const existingUser = await authModel.findOne({ email: userDetails.email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(userDetails.password, 10);

    const authModelData = new authModel({
      name: userDetails.name,
      email: userDetails.email,
      password: hashedPassword,
      phone: userDetails.phone,
    });

    const result = await authModelData.save();
    return result;
  } catch (error) {
    throw new Error("Error in Creating User: " + error.message);
  }
};

module.exports.loginUser = async (email, password) => {
  try {
    const user = await authModel.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      secretKey,
      { expiresIn: '1h' }
    );

    return { user, token };
  } catch (error) {
    throw new Error("Error in Fetching User Data: " + error.message);
  }
};
