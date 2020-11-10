const express = require('express');
const router  = express.Router();
const wishlistController = require('../controllers/wishlistController');
const bodyParser = require('body-parser');

//swagger
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
let swaggerDocument=YAML.load('./swagger/swagger-ui.yml');

let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: false });

//uses
router.use(jsonParser);
router.use(urlencodedParser);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get('/', wishlistController.handleGetWishlists);
router.get('/:id', wishlistController.handleGetWishlistById);
router.delete('/:id', wishlistController.handleDeleteWishlist);
router.post('/', wishlistController.handleCreateWishlist);
router.post('/:id/wishes/', wishlistController.handleAddWish);
router.put('/:id/wishes/:wid', wishlistController.handleUpdateWish);
router.delete('/:id/wishes/:wid', wishlistController.handleDeleteWish);

module.exports = router;