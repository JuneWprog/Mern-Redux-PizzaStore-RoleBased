/**
 * Controller for CRUD operations on category
 * @author Jun Wang (wang.jun6@northeastern.edu)
 *
 */
var Dish = require("../models/dishModel");
var DishCategory = require("../models/dishCategoryModel");
const { check, validationResult } = require("express-validator");
var ObjectId = require("mongoose").Types.ObjectId;
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
var fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "_" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

exports.showMenu = async function (req, res) {
  try {
    const results = await DishCategory.find();
    res.json(results);
  } catch (error) {
    res.status(500).json({
      menuError: "Something went wrong!",
    });
  }
};

exports.showMenuForCategory = async function (req, res) {
  try {
    const result = await DishCategory.findOne({ link: req.params.category });
    if (result) {
      const menu = await Dish.find({ category: result._id });
      res.json(menu);
    }
  } catch (error) {
    res.status(500).json({
      menuError: "Something went wrong!",
    });
  }
};

exports.getCategory = async function (req, res) {
  try {
    const result = await DishCategory.findOne({ _id: req.params.categoryId });
    res.json(result);
  } catch (error) {
    res.status(500).json({
      menuError: "Something went wrong!",
    });
  }
};

exports.addCategory = [
  upload.single("image"),
  check("name")
    .notEmpty()
    .withMessage("Please enter Category Name.")
    .isLength({ max: 60 })
    .withMessage("Length of Dish Name can be 60 characters only.")
    .custom((value, { req }) => {
      if (!req.file) throw new Error("Profile Img is required");
      return true;
    }),
  check("link")
    .notEmpty()
    .withMessage("Please enter link for Category.")
    .isAlphanumeric("en-US", { ignore: "() .?!-_,:;\n\r" })
    .withMessage(
      "link should be Alphanumeric including ().?!,-_:; characters."
    ),
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

      const existCategory = await DishCategory.findOne({ link: req.body.link });
      if (existCategory) {
        return res.status(409).json({
          addCategory: "Category Already Exist.",
        });
      }

      let photo = req.file.filename;
      req.body.imagePath = photo;
      const result = await new DishCategory(req.body).save();
      res.json(result);
    } catch (error) {
      res.status(500).json({
        addCategory: "Something went wrong!",
        re: req.body,
      });
    }
  },
];

exports.updateCategory = [
  upload.single("image"),
  check("name")
    .notEmpty()
    .withMessage("Please enter Category Name.")
    .isLength({ max: 60 })
    .withMessage("Length of Dish Name can be 60 characters only.")
    .custom((value, { req }) => {
      if (!req.file) throw new Error("Profile Img is required");
      return true;
    }),
  check("link")
    .notEmpty()
    .withMessage("Please enter link for Category.")
    .isAlphanumeric("en-US", { ignore: "() .?!-_,:;\n\r" })
    .withMessage(
      "link should be Alphanumeric including ().?!,-_:; characters."
    ),
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
     
      if (req.file) {
        let photo = req.file.filename;
        req.body.imagePath = photo;
        const oldCategory= await DishCategory.findOne({
         "_id": req.params.categoryId,
        });

        if (fs.existsSync(`public/images/${oldCategory.imagePath}`)) {
          fs.unlinkSync(`public/images/${oldCategory.imagePath}`);
        }
      }



      let photo = req.file.filename;
      req.body.imagePath = photo;
      const result = await DishCategory.findOneAndUpdate(
        { _id: req.params.categoryId },
        req.body,
        { new: false }
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({
        updateCategory: "Something went wrong!",
      });
    }
  },
];

exports.deleteCategory =async function (req, res) {
  try {
      const result = await DishCategory.findOneAndDelete(
          { "_id": req.params.categoryId }
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

