/**
 * Controller for CRUD operations on Dish
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
var Dish = require('../models/dishModel');
var DishCategory = require("../models/dishCategoryModel");
var ObjectId = require('mongoose').Types.ObjectId;
const { check, validationResult } = require("express-validator");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
var fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + "_" + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });





exports.loadDishDetails = async function (req, res) {
    try {
        // console.log("Fetching details for dishId:", req.params.dishId);
        const dishDetails = await Dish.findOne({ '_id': new ObjectId(req.params.dishId) }).populate("category");
        if (!dishDetails) {
            return res.status(404).json({ error: "Dish not found" });
        }
        res.json(dishDetails);
    } catch (error) {
        console.error("Error fetching dish details:", error);
        res.status(500).json({ "dishError": "Something went wrong!" });
    }
};


exports.addDish = [
    upload.single("image"),
    check('name')
        .notEmpty().withMessage('Please enter a Name for the Dish.')
        .isLength({ max: 60 }).withMessage("Length of Dish Name can be 60 characters only.")
        .isAlphanumeric("en-US", { 'ignore': '\'- &' }).withMessage("Dish Name should be Alphanumeric.")
        .custom((value, { req }) => {
            if (!req.file) throw new Error("Profile Img is required");
            return true;
        }),
    check('description')
        .notEmpty().withMessage('Please enter the Description for the Dish.')
        .isAlphanumeric("en-US", { 'ignore': '\'() % .?!,-_:;\n\r' }).withMessage("Description should be Alphanumeric including ().?!,-_:; characters."),
    check('price')
        .notEmpty().withMessage('Please enter the Price for the Dish.')
        .isFloat({ min: 1 }).withMessage("Price should be Numeric and greater than $1."),
    check('spice')
        .notEmpty().withMessage('Please enter the Spice Level for the Dish.')
        .isIn(['Mild', 'Medium', 'Hot', 'None']).withMessage("Spice Level should be Mild, Medium , Hot or None."),
    check('category')
        .notEmpty().withMessage('Please enter the Category for the Dish.'),
        // .isIn(categories).withMessage( categories),
    async function (req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                let customizedError = {};
                errors.array().forEach(error => {
                    customizedError[error.param] = error.msg;
                })
                return res.status(422).json(customizedError);
            }
            let photo = req.file.filename;
            req.body.imagePath = photo;
            let category = req.body.category;
            const result1 = await DishCategory.findOne({ name: category });
            req.body.category = result1._id;
            const result = await new Dish(req.body).save();
            res.json(result);
        } catch (error) {
            res.status(500).json({
                "addDish": "Something went wrong!"
            });
        }
    }
];

exports.updateDish = [
    upload.single("image"),
    check('name')
        .notEmpty().withMessage('Please enter a Name for the Dish.')
        .isLength({ max: 60 }).withMessage("Length of Dish Name can be 60 characters only.")
        .isAlphanumeric("en-US", { 'ignore': ' \' - &' }).withMessage("Dish Name should be Alphanumeric."),
    check('description')
        .notEmpty().withMessage('Please enter the Description for the Dish.')
        .isAlphanumeric("en-US", { 'ignore': '() %.?!,-_:;\'\n\r' }).withMessage("Description should be Alphanumeric including ().?!,-_:; characters."),
    check('price')
        .notEmpty().withMessage('Please enter the Price for the Dish.')
        .isFloat({ min: 1 }).withMessage("Price should be Numeric and greater than $1."),
    check('spice')
        .notEmpty().withMessage('Please enter the Spice Level for the Dish.')
        .isIn(['Mild', 'Medium', 'Hot', 'None']).withMessage("Spice Level should be Mild, Medium or Hot."),
    check('category')
        .notEmpty().withMessage('Please enter the Category for the Dish.'),
        //.isIn(['Pizza and Pasta', 'Sides', 'Drinks', 'Desserts']).withMessage("Category should be Pizza and Pasta, Sides, Desserts or Drinks."),
    async function (req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                let customizedError = {};
                errors.array().forEach(error => {
                    customizedError[error.param] = error.msg;
                })
                return res.status(422).json(customizedError);
            }

            if (req.file) {
                let photo = req.file.filename;
                req.body.imagePath = photo;
                const oldDish = await Dish.findOne({ _id: req.params.dishId });
                if (fs.existsSync(`public/images/${oldDish.imagePath}`)) {
                    fs.unlinkSync(`public/images/${oldDish.imagePath}`);
                }
            }

            let category = req.body.category;
            const result1 = await DishCategory.findOne({ name: category });
            req.body.category = result1._id;
            req.body.updatedOn = Date.now();
            const result = await Dish.findOneAndUpdate(
                { "_id": req.params.dishId },
                req.body,
                { new: true }
            );
            res.json(result);
        } catch (error) {
            res.status(500).json({
                "updateDish": "Something went wrong!"
            });
        }
    }
];

exports.deleteDish = async function (req, res) {
    try {
        const result = await Dish.findOneAndDelete(
            { "_id": req.params.dishId }
        );
        if (fs.existsSync(`public/images/${result.imagePath}`)) {
            fs.unlinkSync(`public/images/${result.imagePath}`);
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({
            "dishError": "Something went wrong!"
        });
    }
};

exports.search = async function (req, res) {
    try {
        let criteria = req.params.criteria;
        let categoryDetails = await DishCategory.findOne({
            name: { $regex: new RegExp(criteria, "i") }
        });
        let searchDetails = [];
        if (!categoryDetails) {
            searchDetails = await Dish.find({
                $or: [
                    { name: { $regex: new RegExp(criteria, "i") } },
                    { spice: { $regex: new RegExp(criteria, "i") } },
                    { description: { $regex: new RegExp(criteria, "i") } }
                ]
            });
        } else {
            searchDetails = await Dish.find({
                category: categoryDetails._id
            });
        }
        res.json(searchDetails);
    } catch (error) {
        res.status(500).json({
            "dishError": "Something went wrong!"
        });
    }
};