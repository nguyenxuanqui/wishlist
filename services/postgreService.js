require('dotenv').config()
const Pool = require('pg').Pool;

const pool = new Pool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PWD,
});

exports.init = async () =>{
	let query = `CREATE TABLE IF NOT EXISTS ${process.env.DB_TABLE} (task_id serial PRIMARY KEY,task_name varchar (50) NOT NULL,task_state boolean NOT NULL);`;
	pool.query(query, (err, data) =>{
		if(err) throw err;
		
		console.log("init Db done");
	});
};

exports.testQuery = async () =>{
	pool.query('SELECT * FROM qui_test', (err, data) =>{
		if(err){
			throw err;
		}
		
		console.log("done", data.rows);
	});
};
