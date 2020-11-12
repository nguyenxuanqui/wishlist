const cors = require('cors');
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const wishlist = require('./routes/wishlist');

const port = 3000;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.get('/', (req, res) => {
	res.json({message: 'Welcome to Wishlist API, please access localhost:3000/wishlists/api-docs to see the UI'});
});

app.use('/wishlists', wishlist);

let server = app.listen(port, () =>{
	console.log(`Listening on port ${port}`);
});


module.exports = server;
