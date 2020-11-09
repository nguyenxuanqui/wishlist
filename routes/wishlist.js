const express = require('express');
const router  = express.Router();
const wishlistController = require('../controllers/wishlistController');


router.get('/', (req, res) => {
	res.json({message: 'Welcome to wishlist!!!'});
});
router.get('/quitest', wishlistController.handleQuitest);
module.exports = router;