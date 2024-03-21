const mealKitUtil = require("../models/mealKit-util");

const express = require('express');
const router = express.Router();

// Setup a route to return the menu page
router.get("/on-the-menu", (req, res) => {
    // Get all meal kits
const allMealKits = mealKitUtil.getAllMealKits();
// Get meal kits grouped by category
const mealKitsByCategory = mealKitUtil.getMealKitsByCategory(allMealKits);
    res.render("mealKits/on-the-menu", {
        title: "on-the-menu Page",
        css: "/CSS/on-the-menu.css",
        mealKitsByCategory: mealKitsByCategory // Pass mealKitsByCategory variable here
    });
});

// Setup a route to cart page
router.get("/list", (req, res) => {
    res.render("mealKits/list", {
        title: "mealKit list Page"
          
    });
});

module.exports = router;



