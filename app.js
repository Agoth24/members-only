const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const indexRouter = require("./routes");
const signUpRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const postsRouter = require("./routes/posts");

const app = express();
const PORT = process.env.port || 3000;

app.use(session());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/login", loginRouter);
app.use("/sign-up", signUpRouter);
app.use("/posts", postsRouter);
app.use("/", indexRouter);

app.use((req, res) => {
	res.status(404).json({
		message: "Route doesn't exist. See API Documentation",
	});
});

app.listen(PORT, () => {
	console.log(`Up and running on port ${PORT}`);
	console.log(`Process: ${process.pid}`);
});
