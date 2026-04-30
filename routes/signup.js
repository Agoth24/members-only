const { Router } = require("express");
const {authenticateSignUp} = require("../controllers/authController");
const validate = require("../validators/validate");
const signUpRouter = Router();

signUpRouter.get("/", (req, res) => {
    res.json({message: "Use the POST method to sign up"})
})

signUpRouter.post("/", validate(), authenticateSignUp)

module.exports = signUpRouter;
