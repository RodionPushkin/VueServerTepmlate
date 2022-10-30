const ApiException = require('../exception/api.exception')
const jwt = require('jsonwebtoken')
const db = require('../database')
const tokenService = require('../service/token.service')
module.exports = async (req, res, next) => {
    try{
        if (req.query.token || req.body.token || req.headers.authorization) {
            const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.body.token ? req.body.token : req.query.token
            if (!token) throw ApiException.Unauthorized()
            if(!req.cookies.deviceID) throw ApiException.Unauthorized()
            await tokenService.validate(token,req.cookies.deviceID)
            return next()
        }
        throw ApiException.Unauthorized()
    }catch (e) {
        next(e)
    }
}