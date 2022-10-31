const jwt = require('jsonwebtoken')
const db = require('../database')
const ApiException = require("../exception/api.exception");
// косяк в защите если украдут refresh token и device id то можно выпустить собственный access token
// косяк неудобно понимать что токен недействителен не понятно какой конкретно вышел из строя
// сделать ошибку выхода токена по времени
class TokenService {
    generate(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '3m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '7d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async save(userId, refreshToken, deviceId) {
        const tokenData = await db.query(`SELECT * FROM "token" WHERE "id_user" = ${userId} AND "device_id" = '${deviceId}'`).then(res => res.rows[0])
        let expires = Date.now() + 7 * 24 * 60 * 60 * 1000
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            await db.query(`UPDATE "token" SET "refresh_token" = '${refreshToken}', "expires" = to_timestamp(${expires} / 1000.0) WHERE "id" = ${tokenData.id}`)
            delete tokenData.id
            return tokenData
        }
        const token = await db.query(`INSERT INTO "token" ("id_user","device_id","refresh_token","expires") VALUES (${userId},'${deviceId}','${refreshToken}',to_timestamp(${expires} / 1000.0)) RETURNING "id_user","device_id","refresh_token","expires"`)
        this.clearTimedOutTokens()
    }

    async validate(accessToken, deviceId) {
        // удалять рефреш токен если не прошел валидацию
        if (!accessToken) throw ApiException.Unauthorized()
        if (!deviceId) throw ApiException.Unauthorized()
        this.clearTimedOutTokens()
        const accessTokenData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, decode) => {
            if (err) throw ApiException.BadRequest('не валидный токен пользователя!',['refresh'])
            return decode
        })
        const refreshTokenData = await db.query(`SELECT "id_user","device_id","refresh_token" FROM "token" WHERE "device_id" = '${deviceId}' AND "id_user" = ${accessTokenData.id}`).then(res => res.rows[0])
        if (!refreshTokenData) throw ApiException.TokenNotValid()
        const refreshToken = jwt.verify(refreshTokenData.refresh_token, process.env.JWT_REFRESH_SECRET, (err, decode) => {
            if (err) {
                this.removeToken(refreshToken)
                throw ApiException.BadRequest('не валидный токен пользователя!',['logout'])
            }
            return decode
        })
        return true
    }

    async refresh() {
        this.clearTimedOutTokens()
    }

    async logout(refreshToken) {
        return this.removeToken(refreshToken)
    }

    async login(refreshToken) {
    }

    async removeToken(refreshToken) {
        this.clearTimedOutTokens()
        return await db.query(`DELETE FROM "token" WHERE "refresh_token" = '${refreshToken}' RETURNING `).then(res => res.rows[0])
    }

    clearTimedOutTokens() {
        db.query(`DELETE FROM "token" WHERE "expires" < to_timestamp(${Date.now()} / 1000.0)`)
    }
}

module.exports = new TokenService()