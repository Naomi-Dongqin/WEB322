const mealKitUtil = require("../modules/mealKit-util");
const express = require('express');
const router = express.Router();



// Setup a home page route
router.get("/", (req, res) => {
    res.render("general/home", {
        mealKits: mealKitUtil.getAllMealKits(), // is equal to "mealkits:mealKits"
        // variable used in main.ejs
        title: "Home Page",
        css: "/CSS/home.css" 
    });   
});

// Setup a route to return the menu page
router.get("/on-the-menu", (req, res) => {
    // Get all meal kits
const allMealKits = mealKitUtil.getAllMealKits();
// Get meal kits grouped by category
const mealKitsByCategory = mealKitUtil.getMealKitsByCategory(allMealKits);
    res.render("general/on-the-menu", {
        title: "on-the-menu Page",
        css: "/CSS/on-the-menu.css",
        mealKitsByCategory: mealKitsByCategory // Pass mealKitsByCategory variable here
    });
});

// Setup a route to return the signup page
router.get("/sign-up", (req, res) => {
    res.render("general/sign-up", {
        title: "Sign-Up Page",
        css: "/CSS/sign-up.css"
    });
});

// Setup a route to return the log in page
router.get("/log-in", (req, res) => {
    res.render("general/log-in", {
        title: "Log-in Page",
        css: "CSS/log-in.css"
    });
});


module.exports = router;