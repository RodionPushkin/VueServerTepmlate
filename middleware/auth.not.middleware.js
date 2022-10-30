const ApiException = require('../exception/api.exception')
module.exports = (req, res, next) => {
    try{
        if (req.query.token || req.body.token || req.headers.authorization) throw ApiException.Authorized()
        next()
    }catch (e){
        next(e)
    }
}