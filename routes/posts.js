const { Router } = require("express");
const {
	getPosts,
	createPost,
	deletePost,
} = require("../controllers/postsController");
const validate = require("../validators/validate");
const {
	passcodeSchema,
	messageSchema,
	deleteMessageSchema,
} = require("../validators/schemas");
const { isAdmin, isMember } = require("../controllers/authController");
const postsRouter = Router();

postsRouter.get("/", getPosts);
postsRouter.post("/", isMember, validate(messageSchema), createPost);
postsRouter.delete(
	"/:id",
	isAdmin,
	validate(passcodeSchema),
	validate(deleteMessageSchema),
	deletePost,
);

module.exports = postsRouter;
