const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const {
	getUserById,
	getUserByUsername,
	createUser,
	makeMember,
	makeAdmin,
	deleteUserById,
} = require("../db/userQueries");

const isLoggedIn = (req, res, next) => {
	if (req.user) return next();
	return res.status(401).json({ error: "Not authenticated" });
};

const isMember = (req, res, next) => {
	if (req.user.member) return next();
	return res.status(403).json({ error: "Not a member" });
};

const isAdmin = (req, res, next) => {
	if (req.user?.admin) return next();
	return res.status(403).json({ error: "Forbidden" });
};

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
			return done(null, user);
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
		let user = await getUserById(id);
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

// Come back to this
const authenticateLogin = async (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.status(400).json({ message: info.message });
		req.logIn(user, (err) => {
			if (err) return next(err);
			return res.status(200).json({ message: "Successfully logged in" });
		});
	})(req, res, next);
};

const logOut = (req, res, next) => {
	req.logOut((err) => {
		if (err) return next(err);
		return res.json({ message: "Successfully logged out" });
	});
};

const makeUserMember = async (req, res, next) => {
	try {
		await makeMember(req.user.id);
		return res.status(200).json({ message: "Member activated" });
	} catch (err) {
		return next(err);
	}
};

const makeUserAdmin = async (req, res, next) => {
	try {
		await makeAdmin(req.user.id);
		return res.status(200).json({ message: "Admin privileges activated" });
	} catch (err) {
		return next(err);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		await deleteUserById(req.user.id);
		req.logOut((err) => {
			if (err) return next(err);
			return res
				.status(204)
				.json({ message: "Successfully deleted user" });
		});
	} catch (err) {
		return next(err);
	}
};

module.exports = {
	isLoggedIn,
	isMember,
	isAdmin,
	authenticateSignUp,
	authenticateLogin,
	logOut,
	makeUserMember,
	makeUserAdmin,
	deleteUser,
};
