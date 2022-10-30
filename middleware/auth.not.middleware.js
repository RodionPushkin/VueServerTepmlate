const ApiException = require('../exception/api.exception')
module.exports = (req, res, next) => {
    if (req.query.token || req.body.token || req.headers.authorization) throw ApiException.Authorized()
    next()
}