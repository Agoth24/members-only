const db = require("../db/postQueries");

const getPosts = async (req, res) => {
	const posts = await db.getAllPosts();

	if (req.user.member) {
		return res.status(200).json(posts);
	}
	const anonymousPosts = posts.map((post) => {
		const { firstName, lastName, username, ...anonymousPost } = post;
		return anonymousPost;
	});

	return res.status(200).json(anonymousPosts);
};

const createPost = async (req, res) => {
	const post = await db.createPost({
		authorId: req.user.id,
		title: req.body.title,
		content: req.body.content,
		timestamp: new Date(),
	});

	if (!post) return res.status(500).json({});
	return res.status(201).json(post);
};

const deletePost = async (req, res) => {
	const post = await db.deletePost(req.params.id);

	if (!post) return res.status(500).json({});
	return res.status(200).json(post);
};

module.exports = {
	getPosts,
	createPost,
	deletePost,
};
