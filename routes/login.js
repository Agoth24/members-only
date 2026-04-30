const { Router } = require("express");
const { authenticateSignIn } = require("../controllers/authController");
const loginRouter = Router();

loginRouter.get("/", (req, res) => {
	res.json({ message: "Use the POST method to log in" });
});
loginRouter.post("/", authenticateSignIn);

module.exports = loginRouter;
