/**
 * Controller for CRUD operations on Order
 * @author Jun Wang (wang.jun6@northeastern.edu)
 *
 */
var Order = require("../models/orderModel");
var User = require("../models/userModel");
var ObjectId = require("mongoose").Types.ObjectId;

exports.createOrder = async function (req, res) {
  try {
    let userEmail = req.body.userEmail.toLowerCase();
    const user = await User.findOne({ email: userEmail });
    const orderDetails = await new Order({
      userId: user._id,
      totalPrice: req.body.totalPrice,
      address: req.body.address,
      dishes: req.body.dishes,
      subTotal: req.body.subTotal,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
    }).save();
    res.json(orderDetails);
  } catch (error) {
    res.status(500).json({
      orderCreateError: "Something went wrong!",
    });
  }
};

exports.getOrders = async function (req, res) {
  try {
    let userEmail = req.body.email.toLowerCase();
    const user = await User.findOne({ email: userEmail });
    const orders = await Order.find({ userId: user._id }).sort({
      createdOn: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      orderGetError: "Something went wrong!",
    });
  }
};

exports.getOrderDetails = async function (req, res) {
  try {
    let userEmail = req.body.email.toLowerCase();
    const orders = await Order.findOne({
      _id: new ObjectId(req.params.orderId),
    }).populate("userId");
    if (orders && userEmail === orders.userId.email) {
      res.json(orders);
    } else {
      res.status(422).json({ orderError: "Unauthorized Access!" });
    }
  } catch (error) {
    res.status(500).json({
      orderDetailError: "Something went wrong!",
    });
  }
};

exports.search = async function (req, res) {
  try {
    let userEmail = req.body.email.toLowerCase();
    let criteria = req.params.criteria;
    const user = await User.findOne({ email: userEmail });
    let orders = [];
    if (criteria === "all" || criteria === "ALL") {
      orders = await Order.find();
    } else if (criteria.includes(":")) {
      criteria = criteria.split(":");
      const range = criteria[0];
      const searchStr = criteria[1];
      if (range === "o") {
        orders = await Order.find({ _id: new ObjectId(searchStr) });
      } else if (range === "d") {
        if (searchStr.includes("|")) {
          let date = searchStr.split("|");
          const startDate = new Date(date[0]);
          const endDate = new Date(date[1]);
          orders = await Order.find({
            createdOn: { $gte: startDate, $lte: endDate },
          });
        }
      } else if (range === "a") {
        if (searchStr.length >= 1) {
          orders = await Order.find({
            address: { $regex: new RegExp(searchStr, "i") },
          });
        }
      }
    }
    if (orders && user.userType === "Admin") {
      res.json(orders);
    } else {
      res.status(422).json({ orderError: "Unauthorized Access!" });
    }
  } catch (error) {
    res.status(500).json({
      orderError: "Something went wrong!",
    });
  }
};
