const pool = require("./pool");

const getUserById = async (id) => {
	const { rows } = await pool.query(
		`
        SELECT * FROM users WHERE id = $1;
        `,
		[id],
	);
	return rows[0];
};

const getUserByUsername = async (username) => {
	const { rows } = await pool.query(
		`
        SELECT * FROM users WHERE username = $1;
        `,
		[username],
	);
	return rows[0];
};

const createUser = async ({ firstName, lastName, username, password }) => {
	const { rows } = await pool.query(
		`
        INSERT INTO users 
        (first_name, last_name, username, password)
        VALUES ($1, $2, $3, $4);
        `,
		[firstName, lastName, username, password],
	);
	return rows[0];
};

const makeMember = async (id) => {
	const { rows } = await pool.query(
		`
        UPDATE users
        SET member = true
        WHERE id = $1;
        `,
		[id],
	);

	return rows[0];
};

const makeAdmin = async (id) => {
	const { rows } = await pool.query(`
        UPDATE users
        SET admin = true
        WHERE id = $1;
        `);

	return rows[0];
};

const deleteUserById = async (id) => {
	const { rows } = await pool.query(`
        DELETE FROM users
        WHERE id = $1;
        `, [id]);

	return rows[0];
};

module.exports = {
	getUserById,
	getUserByUsername,
	createUser,
	makeMember,
	makeAdmin,
	deleteUserById,
};
