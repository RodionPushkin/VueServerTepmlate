const jwt = require('jsonwebtoken')
const db = require('../database')
const ApiException = require("../exception/api.exception");
// косяк в защите если украдут refresh token и device id то можно выпустить собственный access token
// косяк неудобно понимать что токен недействителен не понятно какой конкретно вышел из строя
// сделать ошибку выхода токена по времени
class TokenService {
    generate(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '3m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async save(userId, refreshToken, deviceId) {
        const tokenData = await db.query(`SELECT * FROM "token" WHERE "id_user" = ${userId} AND "device_id" = '${deviceId}'`).then(res => res.rows[0])
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            await db.query(`UPDATE "token" SET "refresh_token" = '${refreshToken}' WHERE "id" = ${tokenData.id}`)
            delete tokenData.id
            return tokenData
        }
        const token = await db.query(`INSERT INTO "token" ("id_user","device_id","refresh_token") VALUES (${userId},'${deviceId}','${refreshToken}') RETURNING "id_user","device_id","refresh_token"`)
    }

    async validate(accessToken, deviceId) {
        // удалять рефреш токен если не прошел валидацию
        if (!accessToken) throw ApiException.Unauthorized()
        if (!deviceId) throw ApiException.Unauthorized()
        const accessTokenData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, decode) => {
            if (err) throw ApiException.Unauthorized()
            return decode
        })
        const refreshTokenData = await db.query(`SELECT "id_user","device_id","refresh_token" FROM "token" WHERE "device_id" = '${deviceId}' AND "id_user" = ${accessTokenData.id}`).then(res => res.rows[0])
        if (!refreshTokenData) throw ApiException.Unauthorized()
        const refreshToken = jwt.verify(refreshTokenData.refresh_token, process.env.JWT_REFRESH_SECRET, (err, decode) => {
            if (err) throw ApiException.Unauthorized()
            return decode
        })
        return true
    }
    async refresh(){

    }
}

module.exports = new TokenService()