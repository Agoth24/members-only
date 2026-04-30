const { Router } = require("express");
const {
	getPosts,
	createPost,
	deletePost,
} = require("../controllers/postsController");
const validate = require("../validators/validate");
const { passcodeSchema } = require("../validators/schemas");
const { isAdmin } = require("../controllers/authController");
const postsRouter = Router();

postsRouter.get("/", getPosts);
postsRouter.post("/", createPost);
postsRouter.delete("/:id", isAdmin, validate(passcodeSchema), deletePost);

module.exports = postsRouter;
