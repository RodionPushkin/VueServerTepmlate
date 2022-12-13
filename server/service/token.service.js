const jwt = require('jsonwebtoken')
const db = require('../database')
const ApiException = require("../exception/api.exception");
const bcrypt = require('bcrypt')
const config = require('../../config')
class TokenService {
    generate(payload) {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {expiresIn: '7d'})
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async save(userId, accessToken, refreshToken, deviceId, location) {
        const tokenData = await db.query(`SELECT * FROM "token" WHERE "id_user" = ${userId} AND "device_id" = '${deviceId}'`).then(res => res.rows[0])
        let expires = Date.now() + 30 * 24 * 60 * 60 * 1000 // токен на 30 дней
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            tokenData.accessToken = accessToken;
            await db.query(`UPDATE "token" SET "refresh_token" = '${refreshToken}', "access_token" = '${accessToken}', "expires" = to_timestamp(${expires} / 1000.0) WHERE "id" = ${tokenData.id}`)
            delete tokenData.id
            return tokenData
        }
        const token = await db.query(`INSERT INTO "token" ("id_user","device_id","refresh_token","expires","location","access_token") VALUES (${userId},'${deviceId}','${refreshToken}',to_timestamp(${expires} / 1000.0),'${location}','${accessToken}') RETURNING "id_user","location"`)
        return token
        this.clearTimedOutTokens()
    }

    async validate(accessToken, refreshToken, deviceId, location) {
        if (!accessToken) return false
        if (!refreshToken) return false
        if (!deviceId) return false
        this.clearTimedOutTokens()
        accessToken = await this.validateAccessToken(accessToken)
        refreshToken = await this.validateRefreshToken(refreshToken)
        if (accessToken && refreshToken) {
            const TokenFromDB = await db.query(`SELECT "id_user","device_id","refresh_token","access_token","location" FROM "token" WHERE "device_id" = '${deviceId}' AND "id_user" = ${accessToken.id}`).then(res => res.rows[0])
            if (!TokenFromDB) return false
            if (!bcrypt.compare(location, TokenFromDB.location)) return false
            const refreshTokenFromDB = await this.validateRefreshToken(TokenFromDB.refresh_token)
            const accessTokenFromDB = await this.validateAccessToken(TokenFromDB.access_token)
            if (JSON.stringify(refreshToken) != JSON.stringify(refreshTokenFromDB)) return false
            if (JSON.stringify(accessToken) != JSON.stringify(accessTokenFromDB)) return false
            return true
        }
        return false
    }

    async validateAccessToken(token) {
        return jwt.verify(token, config.JWT_ACCESS_SECRET, (err, decode) => {
            if (err) return undefined
            return decode
        })
    }

    async validateRefreshToken(token) {
        return jwt.verify(token, config.JWT_REFRESH_SECRET, (err, decode) => {
            if (err) return undefined
            return decode
        })
    }

    async logout(refreshToken) {
        return this.removeToken(refreshToken)
    }

    async removeToken(refreshToken) {
        this.clearTimedOutTokens()
        return await db.query(`DELETE FROM "token" WHERE "refresh_token" = '${refreshToken}' RETURNING "id"`).then(res => res.rows[0])
    }

    clearTimedOutTokens() {
        db.query(`DELETE FROM "token" WHERE "expires" < to_timestamp(${Date.now()} / 1000.0)`)
    }
}

module.exports = new TokenService()
