const { Router } = require("express");
const { getPosts, createPost, deletePost,  } = require("../controllers/postsController");
const postsRouter = Router();

postsRouter.get("/", getPosts);
postsRouter.post("/", createPost);
postsRouter.delete("/:id", deletePost);


module.exports = postsRouter;
