const postgreService = require('../services/postgreService');

initDb();

async function initDb(){
	await postgreService.init();
}

exports.handleQuitest = async (req, res) =>{
	res.status(200).json({message: 'quideptrai'});
	postgreService.testQuery();
}