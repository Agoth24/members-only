const { Router } = require("express");
const {authenticateSignUp} = require("../controllers/authController")
const signUpRouter = Router();

signUpRouter.get("/", (req, res) => {
    res.json({message: "Use the POST method to sign up"})
})

signUpRouter.post("/", authenticateSignUp)

module.exports = signUpRouter;
