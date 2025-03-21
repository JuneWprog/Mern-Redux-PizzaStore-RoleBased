/**
 * Routes for menu and categories
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
const express = require("express");
const router = express.Router();
const menuController = require("../controller/menuController");

router.get("/", menuController.showMenu);
router.put("/detail/:categoryId", menuController.updateCategory);
router.get("/detail/:categoryId", menuController.getCategory);
router.get("/:category", menuController.showMenuForCategory);
router.delete("/:categoryId", menuController.deleteCategory);
router.post("/addCategory", menuController.addCategory);

module.exports = router;
