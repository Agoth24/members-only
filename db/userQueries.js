const pool = require("./pool");

const getUserById = async (id) => {
    const {rows} = await pool.query(`
        
        `)
    return rows[0]
}

const getUserByUsername = async (username) => {
    const {rows} = await pool.query(`
        
        `)
    return rows[0]
}

const createUser = async ({ firstName, lastName, username, password }) => {
	const { rows } = await pool.query(`
        
        `);
	return rows[0];
};

const makeMember = async (id) => {
	const { rows } = await pool.query(`
        
        `);

	return rows[0];
};

const makeAdmin = async (id) => {
	const { rows } = await pool.query(`
        
        `);

	return rows[0];
};



const deleteUserById = async (id) => {
	const { rows } = await pool.query(`
        `);

	return rows[0];
};

module.exports = {
    getUserById,
    getUserByUsername,
	createUser,
    makeMember,
    makeAdmin,
    deleteUserById
};
