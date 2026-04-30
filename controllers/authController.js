const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");



const authenticateSignUp = async (req, res, next) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = 
		res.redirect("/");
	} catch (e) {
		return next(e);
	}
};

const authenticateSignIn = async (req, res, next) => {};



module.exports = {
	authenticateSignUp,
	authenticateSignIn,
};
