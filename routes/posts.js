const { Router } = require("express");
const { getPosts, createPost, deletePost,  } = require("../controllers/postsController");
const validate = require("../validators/validate")
const {passcodeSchema} = require("../validators/schemas")
const postsRouter = Router();

postsRouter.get("/", getPosts);
postsRouter.post("/", createPost);
postsRouter.delete("/:id", validate(passcodeSchema), deletePost);


module.exports = postsRouter;
