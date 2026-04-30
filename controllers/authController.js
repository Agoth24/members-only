const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const {
	getUserById,
	getUserByUsername,
	createUser,
	makeMember,
	makeAdmin,
	deleteUser,
} = require("../db/userQueries");

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await getUserByUsername(username);

			if (!user) {
				return done(null, false, {
					message: "Username does not exist",
				});
			}

			const match = await bcrypt.compare(password, user.password);

			if (!match) {
				return done(null, false, { message: "Incorrect password" });
			}
		} catch (err) {
			return done(err);
		}
	}),
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		let user = getUserById(id);
		user = user[0];

		return done(null, user);
	} catch (err) {
		return done(err);
	}
});

const authenticateSignUp = async (req, res, next) => {
	const { firstName, lastName, username, password } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await createUser({
			firstName: firstName,
			lastName: lastName,
			username: username,
			password: hashedPassword,
		});
		res.json(user);
	} catch (err) {
		return next(err);
	}
};

const authenticateLogin = async (req, res, next) => {
	const { username, password } = req.body;

	passport.authenticate("local", {
		successRedirect: "/posts",
		failureRedirect: "/posts",
	});
};

const authenticateLogOut = (req, res, next) => {
	req.logOut((err) => {
		if (err) return next(err);
		res.redirect("/");
	});
};

module.exports = {
	authenticateSignUp,
	authenticateLogin,
	authenticateLogOut,
};
