const db = require("../db/postQueries");

const getPosts = async (req, res) => {

	if (req.user.member) {
		const fullPosts = await db.getAllFullPosts();
		return res.status(200).json(fullPosts);
	}
    
	const posts = await db.getAllPosts();

	const anonymousPosts = posts.map((post) => {
		const { authorId, ...anonymousPost } = post;
		return anonymousPost;
	});

	return res.status(200).json(anonymousPosts);
};

const createPost = async (req, res) => {
	const post = await db.createPost({
		authorId: req.user.id,
		title: req.validated.body.title,
		content: req.validated.body.content,
		timestamp: new Date(),
	});

	if (!post) return res.status(500).json({});
	return res.status(201).json(post);
};

const deletePost = async (req, res) => {
	const post = await db.deletePost(req.validated.params.id);

	if (!post) return res.status(500).json({});
	return res.status(200).json(post);
};

module.exports = {
	getPosts,
	createPost,
	deletePost,
};
