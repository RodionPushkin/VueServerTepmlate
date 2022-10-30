const jwt = require('jsonwebtoken')
const db = require('../database')
const ApiException = require("../exception/api.exception");
class TokenService {
    generate(payload){
        const accessToken = jwt.sign(payload,process.env.JWT_ACCESS_SECRET,{expiresIn: '15m'})
        const refreshToken = jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }
    async save(userId,refreshToken,deviceId){
        const tokenData = await db.query(`SELECT * FROM "token" WHERE "id_user" = ${userId} AND "device_id" = '${deviceId}'`).then(res=>res.rows[0])
        if (tokenData){
            tokenData.refreshToken = refreshToken;
            await db.query(`UPDATE "token" SET "refresh_token" = '${refreshToken}' WHERE "id" = ${tokenData.id}`)
            delete tokenData.id
            return tokenData
        }
        const token = await db.query(`INSERT INTO "token" ("id_user","device_id","refresh_token") VALUES (${userId},'${deviceId}','${refreshToken}') RETURNING "id_user","device_id","refresh_token"`)
    }
    async validate(accessToken,deviceId){
        // удалять рефреш токен если не прошел валидацию
        const accessTokenData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET,(err,decode)=>{
            if(err) throw ApiException.Unauthorized()
            return decode
        })
        if(!accessTokenData.id_user) throw ApiException.Unauthorized()
        const refreshTokenData = await db.query(`SELECT "id_user","device_id","refresh_token" FROM "token" WHERE "device_id" = '${deviceId}' AND "id_user" = ${accessTokenData.id_user}`).then(res=>res.rows[0])
        if(!refreshTokenData.id_user) throw ApiException.Unauthorized()
        console.log(accessTokenData,refreshTokenData)
    }
}
module.exports = new TokenService()