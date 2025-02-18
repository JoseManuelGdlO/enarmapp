
const jwt = require('jsonwebtoken');
const transactionModel = require("../storage/models/transaction.model.js");
const userStatusModel = require("../storage/models/user_status.model.js");

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.status(409).json({error: 'token invalido'});
            } else {
                next()
            }
        });
    } else {
        res.status(409).json({error: 'token invalido'});
    }
}


async function verifyAccount(req, res, next) {
    const decoded = jwt.verify(req.token, 'secretkey');

    const transaction = await transactionModel.findOne({where: {user_id: decoded.user.id}});
    const userStatus = await userStatusModel.findOne({where: {user_id: decoded.user.id}});

    if(transaction){
        let locallyDate = new Date();
        let finished_date = new Date(transaction.finished_date);
        if(locallyDate < finished_date){
            next();
        } else {
            res.status(409).json({error: 'cuenta expirada'});
        }
    } else if(transaction === null && userStatus.name === 3){ 
        next();
    } else {
        res.status(409).json({error: 'cuenta no activa'});
    }

}

module.exports = {
    verifyToken,
    verifyAccount
}