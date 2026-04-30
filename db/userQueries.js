const pool = require("./pool");

const getUser = async (username) => {
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



const deleteUser = async (id) => {
	const { rows } = await pool.query(`
        `);

	return rows[0];
};

module.exports = {
    getUser,
	createUser,
    makeMember,
    makeAdmin,
    deleteUser
};
