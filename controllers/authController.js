const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const {
	getUserById,
	getUserByUsername,
	getUserPasswordById,
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
					error: "Username does not exist",
				});
			}
			const userPassword = await getUserPasswordById(user.id);
			const match = await bcrypt.compare(password, userPassword.password);

			if (!match) {
				return done(null, false, { error: "Incorrect password" });
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
	const { firstName, lastName, username, password } = req.validated.body;

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
		if (!user) return res.status(400).json({ message: info.error });
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
		const member = await makeMember(req.user.id);
		return res.status(200).json(member);
	} catch (err) {
		return next(err);
	}
};

const makeUserAdmin = async (req, res, next) => {
	try {
		const admin = await makeAdmin(req.user.id);
		return res.status(200).json(admin);
	} catch (err) {
		return next(err);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const user = await deleteUserById(req.user.id);
		req.logOut((err) => {
			if (err) return next(err);
			return res.status(200).json(user);
		});
	} catch (err) {
		return next(err);
	}
};

const authenticateMember = async (req, res, next) => {
	try {
		if (req.validated.body.passcode !== process.env.MEMBER_PASSCODE) {
			return res.status(403).json({ message: "Forbidden" });
		}
		next();
	} catch (err) {
		return next(err);
	}
};

const authenticateAdmin = async (req, res, next) => {
	try {
		if (req.validated.body.passcode !== process.env.ADMIN_PASSCODE) {
			return res.status(403).json({ message: "Forbidden" });
		}
		next();
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
	authenticateMember,
	authenticateAdmin,
};
