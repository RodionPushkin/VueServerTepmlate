const ApiException = require('../exception/api.exception')
module.exports = (req, res, next) => {
    try {
        let access_token = req.query.access_token || req.body.access_token || req.headers.authorization ? req.headers.authorization.split(' ')[1] : undefined
        let refresh_token = req.query.refresh_token || req.body.refresh_token || req.cookies.refresh_token
        if (access_token && refresh_token) {
            throw ApiException.Authorized()
        } else {
            next()
        }
    } catch (e) {
        next(e)
    }
}