const { Router } = require("express");
const { authenticateSignUp, authenticateLogin, authenticateLogOut } = require("../controllers/authController");
const validate = require("../validators/validate");
const { signupSchema, loginSchema } = require("../validators/schemas");

const signUpRouter = Router();
const loginRouter = Router();
const logOutRouter = Router();


signUpRouter.post("/", validate(signupSchema), authenticateSignUp);

loginRouter.post("/", validate(loginSchema), authenticateLogin);

logOutRouter.get("/", authenticateLogOut);

module.exports = { signUpRouter, loginRouter, logOutRouter };
