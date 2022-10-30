const jwt = require('jsonwebtoken')
const db = require('database')
class TokenService {
    generateTokens(payload){
        const accessToken = jwt.sign(payload,process.env.JWT_ACCESS_SECRET,{expiresIn: '15m'})
        const refreshToken = jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId,refreshToken,deviceId){
        const tokenData = await db.query(`SELECT * FROM "token" WHERE "id_user" = ${userId} AND "device_id" = '${deviceId}'`).then(res=>res.rows[0])
        if (tokenData){
            tokenData.refreshToken = refreshToken;
            await db.query(`UPDATE "token" SET "refresh_token" = '${refreshToken}' WHERE "id" = ${tokenData.id}`)
            delete tokenData.id
            return tokenData
        }
        const token = await db.query(`INSERT INTO "token" ("id_user","device_id","refresh_token") VALUES (${userId},'${deviceId}','${refreshToken}') RETURNING "id_user","device_id","refresh_token"`)

    }
}
module.exports = new TokenService()