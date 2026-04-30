const pool = require("./pool");

const getAllPosts = async () => {
	const { rows } = await pool.query(`
        
        `);

	return rows;
};

const createPost = async ({ authorId, title, content, timestamp }) => {
	const { rows } = await pool.query(`
        
        `);

	return rows[0];
};

const deletePost = async (id) => {
	const { rows } = await pool.query(`
        
        `);

	return rows[0];
};

module.exports = {
	getAllPosts,
	createPost,
	deletePost,
};
