/*************************************************************************************
* WEB322 - 2241 Project
* I declare that this assignment is my own work in accordance with the Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Student Name  : Dongqin Ran
* Student ID    : dran
* Course/Section: WEB322/NAA
*
**************************************************************************************/

const path = require("path");
const express = require("express");
const expressLayouts = require('express-ejs-layouts');

// Set up dotenv
const dotenv = require("dotenv");
dotenv.config({ path: "./config/keys.env" });

//Set up express
const app = express();

// Require the mealkit-util module
const mealKitUtil = require('./modules/mealKit-util');

// Make the "assets" folder public (aka Static)
app.use(express.static(path.join(__dirname, "/assets")));

// set up EJS
 app.set("view engine", "ejs");
 app.set("layout", "layouts/main");
 app.use(expressLayouts);

// set up body-parse
app.use(express.urlencoded({ extended: false }));
 
// Load the controllers into express
const generalController = require("./controllers/generalController");

app.use("/", generalController);


 


   // Get meal kits grouped by category using the getMealKitsByCategory() function from mealkit-util
   const mealKits = mealKitUtil.getAllMealKits(); 
   const mealKitsByCategory = mealKitUtil.getMealKitsByCategory(mealKits);


// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something broke!")
});


// *** DO NOT MODIFY THE LINES BELOW ***

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}
  
// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);