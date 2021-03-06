const postgreService = require('../services/postgreService');

initDb();

async function initDb(){
	await postgreService.init();
}

exports.handleGetWishlists = async (req, res) => {
	let rows = await postgreService.getWishlists();
	
	res.status(200).json(rows);
};

exports.handleGetWishlistById = async(req, res) =>{
	const id = parseInt(req.params.id);

    if(checkBadRequest(res, id)){
        return;
    }

	let rows = await postgreService.getWishlistById(id);

	res.status(200).json(rows);
};

exports.handleCreateWishlist = async(req, res) =>{
	const {name} = req.query;

    if(checkBadRequest(res, name)){
    	return;
	}

	let result = await postgreService.createWishlist(name);
    let result_obj = {
        id: result.rows[0].id
    };

    checkRowCountAndResponse(res, result.rowCount, 200, "Wishlist Added", result_obj);
};

exports.handleAddWish = async(req, res) =>{
	const {name} = req.query;
    const id = parseInt(req.params.id);

    if(checkBadRequest(res, name, id)){
        return;
    }

    let result = await postgreService.addWish(id, name);
    let result_obj = {
        id: result.rows[0].id
    };

    checkRowCountAndResponse(res, result.rowCount, 200, "Wish Added", result_obj);
};

exports.handleUpdateWish = async(req, res) =>{
	const {name, state} = req.query;
	const id = parseInt(req.params.id);
	const wid = parseInt(req.params.wid);

    if(checkBadRequest(res, name, state, id, wid)){
        return;
    }

    let result = await postgreService.updateWish(id, wid, name, state);
    let result_obj = {
        id: result.rows[0].id
    };

    checkRowCountAndResponse(res, result.rowCount, 200, "Wish Updated", result_obj);
};

exports.handleDeleteWishlist = async (req, res)=>{
    const id = parseInt(req.params.id);

	let result = await postgreService.deleteWishlist(id);

    checkRowCountAndResponse(res, result.rowCount, 200, "Wishlist Deleted");
};

exports.handleDeleteWish = async(req, res)=>{
    const id = parseInt(req.params.id);
    const wid = parseInt(req.params.wid);

    let result = await postgreService.deleteWish(id, wid);

    checkRowCountAndResponse(res, result.rowCount, 200, "Wish Deleted");
};

function checkBadRequest(res, ...params){
	for(let i = 0; i < params.length; i++){
		if(!params[i]){
            res.status(400).json({message: "Bad request! Please re-check param"});
            return 1;
		}
	}

	return 0;
}

function checkRowCountAndResponse(res, rowCount, status, message, obj = {}){
    if(rowCount === 0){
        status = 400;
        message = "No " + message;
    }
    let result = {message: message, ...obj};

    res.status(status).json(result);
}