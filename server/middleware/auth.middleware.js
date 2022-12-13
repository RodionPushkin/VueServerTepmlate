const ApiException = require('../exception/api.exception')
const jwt = require('jsonwebtoken')
const db = require('../database')
const tokenService = require('../service/token.service')
const geoip = require('geoip-lite')
module.exports = async (req, res, next) => {
    try {
        let access_token = req.query.access_token || req.body.access_token || req.headers.authorization ? req.headers.authorization.split(' ')[1] : undefined
        let refresh_token = req.query.refresh_token || req.body.refresh_token || req.cookies.refresh_token
        if (access_token && refresh_token && req.cookies.device_id) {
            const isValid = await tokenService.validate(access_token, refresh_token, req.cookies.device_id, `${geoip.lookup(req.ip)?.country}/${geoip.lookup(req.ip)?.city}`)
            if (isValid) {
                return next()
            } else {
                throw ApiException.BadRequest('пользователь не авторизирован!', ['logout'])
            }
        }
        if (!access_token && refresh_token) {
            throw ApiException.BadRequest('пользователь не авторизирован!', ['logout'])
        }
        throw ApiException.Unauthorized()
    } catch (e) {
        next(e)
    }
}