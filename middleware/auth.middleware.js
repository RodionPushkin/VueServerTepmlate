const ApiException = require('../exception/api.exception')
const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    console.log("Авторизация нахуй")
    // next()
    if (req.query.token || req.body.token || req.headers.authorization) {
        console.log(1)
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.body.token ? req.body.token : req.query.token
        if (!token) throw ApiException.Unauthorized()
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        console.log(decoded)
        if (!decoded) throw ApiException.Unauthorized()
        next()
    }
    throw ApiException.Unauthorized()
}