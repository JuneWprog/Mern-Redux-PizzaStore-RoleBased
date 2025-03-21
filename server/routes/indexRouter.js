/**
 * Routes for users
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const orderController = require("../controller/orderController");
const dishController = require("../controller/dishController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/profile", userController.updateProfile);
router.post("/checkout", orderController.createOrder);
router.get("/searchDish/:criteria", dishController.search);
router.post("/searchOrder/:criteria", orderController.search);

module.exports = router;
