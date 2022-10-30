const ApiException = require('../exception/api.exception')
const jwt = require('jsonwebtoken')
const db = require('../database')
module.exports = (req, res, next) => {
    if (req.query.token || req.body.token || req.headers.authorization) {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.body.token ? req.body.token : req.query.token
        if (!token) throw ApiException.Unauthorized()
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET,(err,decode)=>{
            if(err) throw ApiException.Unauthorized()
            return decode
        })
        if (!decoded) throw ApiException.Unauthorized()
        return next()
    }
    throw ApiException.Unauthorized()
}