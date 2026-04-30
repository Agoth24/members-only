const express = require("express");
const session = require("express-session");
const passport = require("passport");

const { signUpRouter, loginRouter, logOutRouter } = require("./routes/auth");
const postsRouter = require("./routes/posts");
const memberRouter = require("./routes/membership");
const { isLoggedIn } = require("./controllers/authController");

const app = express();
const PORT = process.env.port || 3000;

app.use(session({secret: "black cat", resave: false, saveUninitialized: false}));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/sign-up", signUpRouter);
app.use("/login", loginRouter);
app.use("/log-out", isLoggedIn,logOutRouter);
app.use("/posts", isLoggedIn, postsRouter);
app.use("/members", isLoggedIn, memberRouter);
app.use("/", (req, res) => {
	res.json({ message: "Home" });
});

app.use((req, res) => {
	res.status(404).json({
		message: "Route doesn't exist. See API Documentation",
	});
});

app.listen(PORT, () => {
	console.log(`Up and running on port ${PORT}`);
	console.log(`Process: ${process.pid}`);
});
