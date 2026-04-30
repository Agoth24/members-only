const { Router } = require("express");
const { authenticateLogin } = require("../controllers/authController");
const validate = require("../validators/validate");
const { loginSchema } = require("../validators/schemas");
const loginRouter = Router();

loginRouter.get("/", (req, res) => {
	res.json({ message: "Use the POST method to log in" });
});
loginRouter.post(
	"/",
	validate(loginSchema),
	authenticateLogin,
);

module.exports = loginRouter;
