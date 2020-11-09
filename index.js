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
)

app.get('/', (req, res) => {
	res.json({message: 'Hello world'});
})

app.use('/wishlist', wishlist);

app.listen(port, () =>{
	console.log(`Listening on port ${port}`);
});
