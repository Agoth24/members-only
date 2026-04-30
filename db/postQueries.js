const pool = require("./pool");

const getAllPosts = async () => {
	const { rows } = await pool.query(`
        SELECT id, author_id AS "authorId", title, content, created_at AS "createdAt" 
        FROM posts;
        `);
	return rows;
};

const getAllFullPosts = async () => {
	const { rows } = await pool.query(`
        SELECT p.id, p.author_id AS "authorId", u.first_name AS 
        "firstName", u.last_name AS "lastName", u.username, p.title, p.content, 
        p.created_at AS "createdAt"
        FROM posts p join users u on p.author_id = u.id;
        `);
	return rows;
};

const createPost = async ({ authorId, title, content, timestamp }) => {
	const { rows } = await pool.query(
		`
        INSERT INTO posts 
        (author_id, title, content, created_at)
        VALUES ($1, $2, $3, $4)
        RETURNING id, author_id AS "authorId", title, content, created_at AS "createdAt";
        `,
		[authorId, title, content, timestamp],
	);

	return rows[0];
};

const deletePost = async (id) => {
	const { rows } = await pool.query(
		`
        DELETE FROM posts
        WHERE id = $1
        RETURNING id, author_id AS "authorId", title, content, created_at AS "createdAt";
        `,
		[id],
	);

	return rows[0];
};

module.exports = {
	getAllPosts,
	getAllFullPosts,
	createPost,
	deletePost,
};
