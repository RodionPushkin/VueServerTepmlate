const db = require('../database')
const tokenService = require('./token.service')

class ConnectionService {
  async connect(access_token,peer) {
    let data = await tokenService.validateAccessToken(access_token)
    if (data) {
      let token = (await db.query(`SELECT * FROM "token" WHERE "id_user" = ${data.id} AND "access_token" = '${access_token}'`)).rows[0]
      if(token){
        db.query(`SELECT * FROM "connection" WHERE "id_token" = ${token.id} AND "peer" = '${peer}'`).then(res => res.rows).then(async rows => {
          if(rows.length == 0){
            await db.query(`INSERT INTO "connection" ("id_token","peer") VALUES (${token.id},'${peer}')`)
            await db. query(`UPDATE "user" SET online_at = to_timestamp(${Date.now()} / 1000.0) WHERE "id" = ${data.id}`)
          }else{
            await db. query(`UPDATE "user" SET online_at = to_timestamp(${Date.now()} / 1000.0) WHERE "id" = ${data.id}`)
          }
        })
      }
    }
  }

  async disconnect(access_token,peer) {
    let data = await tokenService.validateAccessToken(access_token)
    if (data) {
      let token = (await db.query(`SELECT * FROM "token" WHERE "id_user" = ${data.id} AND "access_token" = '${access_token}'`)).rows[0]
      if(token){
        db.query(`SELECT * FROM "connection" WHERE "id_token" = ${token.id} AND "peer" = '${peer}'`).then(res => res.rows).then(async rows => {
          if(rows.length != 0){
            await db.query(`DELETE FROM "connection" WHERE "id_token" = ${token.id} AND "peer" = '${peer}'`)
            await db.query(`UPDATE "user" SET online_at = to_timestamp(${Date.now()} / 1000.0)`)
          }
        })
      }
    }
  }
}

module.exports = new ConnectionService()