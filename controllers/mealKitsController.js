const mealKitUtil = require("../modules/mealKit-util");
const express = require("express");

const router = express.Router();

// Setup a home page route
router.get("/", (req, res) => {
    res.render("mealKits/list", {
    mealKits: mealKitUtil.getFeaturedMealKits(mealKitUtil.getAllMealKits()),
    title: "MealKits list"
    });
});

router.get("/category", (req, res) => {
    res.render("mealKits/list", {
        mealKits: mealKitUtil.getMealKitsByCategory(mealKitUtil.getAllMealKits()),
        title: "Grouped by Category mealKits list"
    });
});

module.exports = router;