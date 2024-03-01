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
        validationSignUpMessage: {},
        values: {
            firstName: "",
            lastName: "",
            email: "",
            password:""
        }   
    });
});

router.post("/sign-up", (req, res) => {
   
    console.log(req.body);
    let { firstName, lastName, email, password } = req.body;
    let validationSignUpPassed = true;
    let validationSignUpMessage = {};
    // validate first name (not null and not empty)
    if (typeof (firstName) !== "string") {
        validationSignUpPassed = false;
        validationSignUpMessage.firstName = "Please enter your first name";
    }
    else if (firstName.length === 0) {
        validationSignUpMessage.firstName = "first name must contain at least 1 character";
        validationSignUpPassed = false;
    }
    //validate email (regular expression)
    const regExp = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/gm;
    if (typeof (email) !== "string") {
        validationSignUpPassed = false;
        validationSignUpMessage.email = "email is required";
    }
    else if (email.length === 0) {
        validationSignUpPassed = false;
        validationSignUpMessage.email = "email must contain at least 1 character";
    }
    else if (!regExp.test(email)) {
        validationSignUpPassed = false;
        validationSignUpMessage.email = "invalid email address";
    }
    //validate password (length is 8-12 and at least one character,one digit, one symbol)
    const passwordReg = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\$@#%^&*()\\[\]{}|\\/~`!?"';:_]){8,12}/g;
   
    if (typeof (password) !== "string") {
        validationSignUpPassed = false;
        validationSignUpMessage.password = "password is required";
    }
    else if (password.length === 0) {
        validationSignUpPassed = false;
        validationSignUpMessage.password = "password must contain at least 1 character";
    }
    else if (!passwordReg.test(password)) {
        validationSignUpPassed = false;
        validationSignUpMessage.password = "a password contains 8 to 12 characters at least one lowercase letter, uppercase letter, number and a symbol";
    }
    // output
    if (validationSignUpPassed) {
        // set up email
        const sgMail = require("@sendgrid/mail");
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        // construct an email structure
        const msg = {
        to:"naomiran1989@gmail.com",
        from:"dran@myseneca.ca",
        subject: "Congratuate to become a member of Fresh Eatery",
        html:
        `Visitor's Email Address:${email}<br>
       `   
        };
// send the email
        sgMail.send(msg)
            .then(() => {
                res.render("general/welcome", {
                    title: "Welcome"
                });
            })
            .catch(err => {
                console.log(err);
                res.render("general/sign-up", {
                    title: "sign-up page",
                    validationSignUpMessage,
                    values: req.body
                });
            });
    } else {
        res.render("general/sign-up", {
            title: "sign-up page",
            validationSignUpMessage,
            values: req.body
        });
    }
});

// Setup a route to return the log in page
router.get("/log-in", (req, res) => {
    res.render("general/log-in", {
        title: "Log-in Page",
        validationMessage: {},
        values: {
            email: "",
            password:""
        }   
    });
});


// Setup a route to get the data from users' input
router.post("/log-in", (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    let validated = true;
    let validationMessage = {};

    if (typeof (email) !== "string" || email.trim().length === 0 ) {
        validated = false;
        validationMessage.email = "You must enter one email address";
    }
   else if (email.trim().length < 2) {
        validated = false;
        validationMessage.email = "Email address has at least 1 character";
    }
    if (typeof (password) !== "string" || password.trim().length === 0) {
        validated = false;
        validationMessage.password = "password is required";
    }
    if (validated) {
        res.send("Welcome!");  
    }
    else {
        res.render("general/log-in", {
            title: "Log-in Page",
            validationMessage,
            values:req.body
        });
    } 
});


module.exports = router;