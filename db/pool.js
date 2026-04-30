const { Pool } = require("pg");

const pool = new Pool({
	host: "localhost",
	user: "agoth",
	database: "express_auth",
	port: 5432,
});

module.exports = pool;