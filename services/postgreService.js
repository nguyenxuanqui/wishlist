require('dotenv').config()
const {Pool} = require('pg');

const pool = new Pool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PWD,
});


exports.init = async () =>{
	try{
		let query = `CREATE TABLE IF NOT EXISTS wishlists (id int GENERATED ALWAYS AS IDENTITY, name varchar (50) NOT NULL,owner varchar(50) default 'user', createTime timestamp default now(), PRIMARY KEY(id));`;
		await pool.query(query);
		console.log("create wishlists done");
		
		
		query = `CREATE TABLE IF NOT EXISTS wishes (id int GENERATED ALWAYS AS IDENTITY, name varchar (50) NOT NULL, state boolean default false, wishlist_Id int, createTime timestamp default now(), PRIMARY KEY(id), CONSTRAINT fk_wishlist FOREIGN KEY(wishlist_Id) REFERENCES wishlists(id))`;
		await pool.query(query);
		
		console.log("create wishes done");
	}
	catch(e){
		console.log("postgreService.init error", e.stack);
	}
};

exports.getWishlists = async () => {
	try{
		let query = `SELECT * FROM wishlists order by id asc`;
		const res = await pool.query(query);
		return res.rows;
	}
	catch(e){
		console.log("postgreService.getWishlists error", e.stack);
	}
};

exports.getWishlistById = async (id) => {
	try{
		let query = `SELECT * FROM wishes where wishlist_id = ${id}`;
		const res = await pool.query(query);
		return res.rows;
	}
	catch(e){
		console.log("postgreService.getWishlistById error", e.stack);
	}
};

exports.createWishlist = async (name) =>{
	try{
		let query = `INSERT INTO wishlists (name) values ('${name}') RETURNING id`;
		const res = await pool.query(query);
		return res;
	}
	catch(e){
		console.log("postgreService.createWishlist error", e.stack);
	}
};

exports.addWish = async(id, name) =>{
	try{
        let query = `INSERT INTO wishes (name, wishlist_id) select '${name}', ${id} where exists (select * from wishlists where id = ${id}) RETURNING id`;
        const res = await pool.query(query);
        return res;
	}
	catch(e){
        console.log("postgreService.addWish error", e.stack);
	}
};

exports.updateWish = async (wishlist_id, id, name, state) =>{
    try{
        let query = `UPDATE wishes set name='${name}', state=${state}, createTime=now() where id=${id} AND wishlist_id =${wishlist_id} RETURNING id`;
        const res = await pool.query(query);
        return res;
    }
    catch(e){
        console.log("postgreService.updateWish error", e.stack);
    }
};

exports.deleteWishlist = async(id) =>{
	try{
		//delete all wishes in wishlist
		let query = `DELETE FROM wishes where wishlist_id=${id}`;
		let res = await pool.query(query);

		//delete wishlist in wishlists
		query = `DELETE FROM wishlists where id=${id}`;
		await pool.query(query);

		return res;
	}
	catch(e){
        console.log("postgreService.deleteWishlist error", e.stack);
	}
};

exports.deleteWish = async(wishlist_id, id) =>{
	try{
		let query = `DELETE FROM wishes where wishlist_id=${wishlist_id} AND id=${id}`;
		let res = await pool.query(query);
		return res;
	}
	catch(e){
        console.log("postgreService.deleteWish error", e.stack);
	}
};

