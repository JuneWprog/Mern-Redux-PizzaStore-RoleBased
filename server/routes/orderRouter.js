/**
 * Routes for orders
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router.post("/", orderController.getOrders);
router.post("/:orderId", orderController.getOrderDetails);

module.exports = router;
