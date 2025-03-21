/**
 * Controller for CRUD operations on user
 * Authentication and authorization is done here
 * @author Jun Wang (wang.jun6@northeastern.edu)
 *
 */
var User = require("../models/userModel");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");

exports.register = [
  check("firstName")
    .notEmpty()
    .withMessage("Please enter First Name.")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("First Name should be Alphabetic."),
  check("lastName")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Last Name should be Alphabetic."),
  check("email")
    .notEmpty()
    .withMessage("Please enter Email Address.")
    .isEmail()
    .withMessage("Invalid email format."),
  check("phone")
    .notEmpty()
    .withMessage("Please enter Phone Number.")
    .isNumeric()
    .withMessage("Invalid phone number."),
  async function (req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let customizedError = {};
        errors.array().forEach((error) => {
          customizedError[error.param] = error.msg;
        });
        return res.status(422).json(customizedError);
      }

      const { firstName, lastName, address, phone, email, encryptedPassword } =
        req.body;

      if (
        !(
          email &&
          encryptedPassword &&
          firstName &&
          lastName &&
          address &&
          phone
        )
      ) {
        res.status(400).json({
          register: "All input is required",
        });
      }

      let decryptedPassword = CryptoJS.AES.decrypt(
        encryptedPassword,
        process.env.SECRET
      ).toString(CryptoJS.enc.Utf8);

      const oldUser = await User.findOne({ email: email.toLowerCase() });
      if (oldUser) {
        return res.status(409).json({
          register: "User Already Exist. Please Login.",
        });
      }

      var hashedPassword = await bcrypt.hash(decryptedPassword, 10);
      const user = await new User({
        firstName,
        lastName,
        address,
        mobileNumber: phone,
        email: email.toLowerCase(),
        password: hashedPassword,
        userType: "User",
      }).save();

      let registeredUser = { ...user };

      delete registeredUser._doc.password;
      delete registeredUser._doc.email;
      res.status(200).json(registeredUser);
    } catch (err) {
      res.status(500).json({
        register: "Something went wrong!",
      });
    }
  },
];

exports.login = [
  check("email")
    .notEmpty()
    .withMessage("Please enter Email Address.")
    .isEmail()
    .withMessage("Invalid email format."),
  async function (req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let customizedError = {};
        errors.array().forEach((error) => {
          customizedError[error.param] = error.msg;
        });
        return res.status(422).json(customizedError);
      }
      const { email, encryptedPassword } = req.body;
     

      if (!(email && encryptedPassword)) {
        return res.status(400).json({
          login: "All input is required."
          
        });
      }

      let decryptedPassword = CryptoJS.AES.decrypt(
        encryptedPassword,
        process.env.SECRET
      ).toString(CryptoJS.enc.Utf8);

      let user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(400).json({ login: "Invalid Credentials." }); //  Return here
      }

      // Validate password
      const isPasswordValid = await bcrypt.compare(
        decryptedPassword,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({ login: "Invalid Credentials." }); //  Return here
      }

      // Create JWT Token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );

      // Send Response
      const loggedInUser = { ...user, accessToken: token };
      delete loggedInUser.password;
      delete loggedInUser.email;

      return res.status(200).json(loggedInUser); //  Return here
    } catch (err) {
      console.error("Login Error:", err);
      return res.status(500).json({ login: "Something went wrong!" }); //  Return here
    }
  },
];


exports.updateProfile = [
  check("firstName")
    .notEmpty()
    .withMessage("Please enter First Name.")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("First Name should be Alphabetic."),
  check("lastName")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Last Name should be Alphabetic."),
  check("email")
    .notEmpty()
    .withMessage("Please enter Email Address.")
    .isEmail()
    .withMessage("Invalid email format."),
  check("phone")
    .notEmpty()
    .withMessage("Please enter Phone Number.")
    .isNumeric()
    .withMessage("Invalid phone number."),
  async function (req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let customizedError = {};
        errors.array().forEach((error) => {
          customizedError[error.param] = error.msg;
        });
        return res.status(422).json(customizedError);
      }
      const { firstName, lastName, address, phone, email } = req.body;

      if (!(email && firstName && lastName && address && phone)) {
        res.status(400).json({
          profile: "All input is required",
        });
      }

      const updatedOn = Date.now();
      const result = await User.findOneAndUpdate(
        { email: req.body.email },
        {
          firstName,
          lastName,
          address,
          mobileNumber: phone,
          email,
          updatedOn,
        },
        { new: true }
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({
        profile: "Something went wrong!",
      });
    }
  },
];
