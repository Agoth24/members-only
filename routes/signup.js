const { Router } = require("express");
const { authenticateSignUp } = require("../controllers/authController");
const validate = require("../validators/validate");
const { signupSchema } = require("../validators/schemas");
const signUpRouter = Router();

signUpRouter.post(
	"/",
	validate(signupSchema),
	authenticateSignUp,
);

module.exports = signUpRouter;
