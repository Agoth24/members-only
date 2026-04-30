const { Router } = require("express");
const { authenticateLogin } = require("../controllers/authController");
const validate = require("../validators/validate");
const { loginSchema } = require("../validators/schemas");

const loginRouter = Router();
const logOutRouter = Router();

loginRouter.post("/", validate(loginSchema), authenticateLogin);

logOutRouter.get("/", (req, res, next) => {
	req.logOut((err) => {
		if (err) return next(err);
		res.redirect("/");
	});
});

module.exports = loginRouter;
