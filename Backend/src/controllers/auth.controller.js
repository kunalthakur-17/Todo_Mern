const UserModel  = require("../model/User.model")

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerUser(req, res) {
  try {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      treamandcondition
    } = req.body;

    /* ==============================
       1️⃣ Required field validation
    =============================== */
    if (!firstName || !lastName || !email || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    /* ==============================
       2️⃣ Email format validation
    =============================== */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    /* ==============================
       3️⃣ Password strength validation
    =============================== */
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    /* ==============================
       4️⃣ Terms & condition check
    =============================== */
    // if (!treamandcondition) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "You must accept terms and conditions",
    //   });
    // }

    /* ==============================
       5️⃣ Email already exists
    =============================== */
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    /* ==============================
       6️⃣ Username already exists
    =============================== */
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already taken",
      });
    }

    /* ==============================
       7️⃣ Password hashing failure
    =============================== */
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to secure password",
      });
    }

    /* ==============================
       8️⃣ User creation failure
    =============================== */
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      username,
      password: hashPassword,
      treamandcondition,
    });

    try {
      await newUser.save();
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to create user",
      });
    }

    /* ==============================
       9️⃣ Token generation error
    =============================== */
    let token;
    try {
      token = treamandcondition
        ? jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
        : jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate authentication token",
      });
    }

    /* ==============================
       🔟 Success response
    =============================== */
    return res.status(201).json({
      status: 201,
      success: true,
      message: "User registered successfully",
      token,
      userId: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      username: newUser.username,
    });

  } catch (err) {
    /* ==============================
       1️⃣1️⃣ Unexpected server error
    =============================== */
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}



async function loginUser(req, res) {
  try {
    const { identifier, password } = req.body;

    /* ==============================
       1️⃣ Required field validation
    =============================== */
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    /* ==============================
       2️⃣ User existence check (email or username)
    =============================== */
    const user = await UserModel.findOne({
      $or: [
        { email: identifier },
        { username: identifier }
      ]
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    /* ==============================
       3️⃣ Password validation
    =============================== */
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    /* ==============================
       4️⃣ Token generation error
    =============================== */
    let token;
    try {
      token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate authentication token",
      });
    }

    /* ==============================
       🔟 Success response
    =============================== */
    return res.status(200).json({
      status: 200,
      success: true,
      message: "User logged in successfully",
      token,
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    });

  } catch (err) {
    /* ==============================
       1️⃣1️⃣ Unexpected server error
    =============================== */
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}


async function logOut(req, res){
      try {
        res.clearCookie("token")
        res.status(200).json({
            success : true,
            message : "User logged out successfully"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal server error"

        })
    }
}

const authController = {
    registerUser,
    loginUser,
    logOut
}

module.exports = authController