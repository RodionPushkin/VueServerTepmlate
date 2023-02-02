const authMiddleware = require('./middleware/auth.middleware')
const authNotMiddleware = require('./middleware/auth.not.middleware')
const corsMiddleware = require('./middleware/cors.middleware')
const corsAllMiddleware = require('./middleware/cors.all.middleware')
const tokenService = require('./service/token.service')
const libService = require('./service/lib.service')
const sharp = require('sharp')
const ApiException = require('./exception/api.exception')
const {body, validationResult} = require('express-validator');
const db = require('./database')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const geoip = require('geoip-lite')
const path = require('path')
const fs = require('fs')

class Longpool {
  constructor(name) {
    this.connected = []
    this.name = name
  }

  connect(id, req, res, callback) {
    this.connected.push({
      id: id,
      rid: req.rid,
      req: req,
      res: res
    })
    console.log(`${this.name} connect connected: ${this.connected.length}`)
    this.notify(id, "connect", callback)
  }

  disconnect(id, rid, callback) {
    this.notify(id, "disconnect", callback)
    this.connected = this.connected.filter(item => item.id != id && item.rid != rid)
    console.log(`${this.name} disconnect connected: ${this.connected.length}`)
  }

  notify(id, type, callback = () => {
  }) {
    switch (type) {
      case "update": {
        console.log(`${this.name} update connected: ${this.connected.length}`)
        callback(this.connected)
        break
      }
      case "connect": {
        callback(this.connected)
        break
      }
      case "disconnect": {
        callback(this.connected)
        break
      }
    }
  }
}

const saveFiles = async (files) => {
  return new Promise(async (resolve, reject) => {
    let pathForFiles = path.join(__dirname, "/static/")
    if (files.file.length) {
      const result = []
      files.file.forEach((file, index) => {
        let newFileName = `${uuid.v4()}`
        let fileType = file.name.split('.')[file.name.split('.').length - 1]
        file.mv(pathForFiles + `${newFileName}.${fileType}`, async () => {
          await sharp(pathForFiles + `${newFileName}.${fileType}`).metadata().then(async info => {
            const config = {
              jpeg: {quality: 80},
              webp: {quality: 80},
              png: {compressionLevel: 8},
            }
            await sharp(pathForFiles + `${newFileName}.${fileType}`)[info.format](config[info.format]).resize({
              width: Math.round(info.width / 3),
              height: Math.round(info.height / 3),
            }).toFile(pathForFiles + `${newFileName}.x3.${fileType}`)
            await sharp(pathForFiles + `${newFileName}.${fileType}`)[info.format](config[info.format]).resize({
              width: Math.round(info.width / 2),
              height: Math.round(info.height / 2),
            }).toFile(pathForFiles + `${newFileName}.x2.${fileType}`)
            await sharp(pathForFiles + `${newFileName}.${fileType}`)[info.format](config[info.format]).resize({
              width: Math.round(info.width / 1.2),
              height: Math.round(info.height / 1.2),
            }).toFile(pathForFiles + `${newFileName}.x1.${fileType}`)
            result.push({
              x3: `${newFileName}.x3.${fileType}`,
              x2: `${newFileName}.x2.${fileType}`,
              x1: `${newFileName}.x1.${fileType}`,
              original: `${newFileName}.${fileType}`,
            })
            if (result.length == files.file.length) {
              resolve({
                x3: `${newFileName}.x3.${fileType}`,
                x2: `${newFileName}.x2.${fileType}`,
                x1: `${newFileName}.x1.${fileType}`,
                original: `${newFileName}.${fileType}`,
              })
            }
          })
        })
      })
    } else {
      let newFileName = `${uuid.v4()}`
      let fileType = files.file.name.split('.')[files.file.name.split('.').length - 1]
      await files.file.mv(pathForFiles + `${newFileName}.${fileType}`, async () => {
        await sharp(pathForFiles + `${newFileName}.${fileType}`).metadata().then(async info => {
          const config = {
            jpeg: {quality: 80},
            webp: {quality: 80},
            png: {compressionLevel: 8},
          }
          await sharp(pathForFiles + `${newFileName}.${fileType}`)[info.format](config[info.format]).resize({
            width: Math.round(info.width / 3),
            height: Math.round(info.height / 3),
          }).toFile(pathForFiles + `${newFileName}.x3.${fileType}`)
          await sharp(pathForFiles + `${newFileName}.${fileType}`)[info.format](config[info.format]).resize({
            width: Math.round(info.width / 2),
            height: Math.round(info.height / 2),
          }).toFile(pathForFiles + `${newFileName}.x2.${fileType}`)
          await sharp(pathForFiles + `${newFileName}.${fileType}`)[info.format](config[info.format]).resize({
            width: Math.round(info.width / 1.2),
            height: Math.round(info.height / 1.2),
          }).toFile(pathForFiles + `${newFileName}.x1.${fileType}`)
          resolve({
            x3: `${newFileName}.x3.${fileType}`,
            x2: `${newFileName}.x2.${fileType}`,
            x1: `${newFileName}.x1.${fileType}`,
            original: `${newFileName}.${fileType}`,
          })
        })
      })
    }
  })
}

module.exports = router => {
  /**
   * @swagger
   * /api:
   *   get:
   *       description: api is working
   *       responses:
   *           '200':
   *               description: all right
   * */
  router.options('/api', corsAllMiddleware)
  router.get(`/api`, [corsAllMiddleware], (req, res, next) => {
    try {
      res.json({data: `hello world`})
    } catch (e) {
      next(e)
    }
  })
  /**
   * @swagger
   * /api/user:
   *   post:
   *       description: Регистрация аккаунта
   *       parameters:
   *         - name: email
   *           required: true
   *           in: body
   *           type: string
   *         - name: password
   *           required: true
   *           in: body
   *           type: string
   *       responses:
   *           '200':
   *               description: возвращает access_token,refresh_token и user
   * */
  router.options('/api/user', corsAllMiddleware)
  router.post(`/api/user`, [corsAllMiddleware, authNotMiddleware, body('email').isEmail(), body('password').isLength({
    min: 6,
    max: 32
  })], async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw ApiException.BadRequest('Не корректные данные!', errors.array())
      const candidate = {
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 4),
        activation_link: uuid.v4(),
        location: await bcrypt.hash(`${geoip.lookup(req.ip)?.country}/${geoip.lookup(req.ip)?.city}`, 4)
      }
      if (await db.query(`SELECT * FROM "user" WHERE "email" = '${candidate.email}'`).then(result => result.rowCount) > 0) throw ApiException.BadRequest('Пользователь уже зарегистрирован!', [])
      const user = await db.query(`INSERT INTO "user" ("email","password","activation_link") VALUES ('${candidate.email}','${candidate.password}','${candidate.activation_link}') RETURNING *`).then(result => result.rows[0])
      delete user.password
      delete user.email
      delete user.activation_link
      delete user.created_at
      const deviceID = uuid.v4()
      const tokens = tokenService.generate({id: user.id, location: candidate.location, deviceID: deviceID})
      await tokenService.save(user.id, tokens.accessToken, tokens.refreshToken, deviceID, candidate.location)
      res.cookie('device_id', deviceID, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV ? process.env.NODE_ENV == "production" : false
      })
      res.cookie('refresh_token', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV ? process.env.NODE_ENV == "production" : false
      })
      res.set('Authorization', `Bearer ${tokens.accessToken}`)
      res.json({access_token: tokens.accessToken, refresh_token: tokens.refreshToken, user})
    } catch (e) {
      next(e)
    }
  })
  /**
   * @swagger
   * /api/user/refresh:
   *   put:
   *       description: Обновление токенов
   *       parameters:
   *         - name: refresh_token
   *           required: true
   *           in: body
   *           type: string
   *         - name: access_token
   *           required: true
   *           in: body
   *           type: string
   *         - name: device_id
   *           in: cookies
   *           required: true
   *           type: string
   *       responses:
   *           '200':
   *               description: возвращает access_token,refresh_token и user
   * */
  router.put(`/api/user/refresh`, [corsAllMiddleware, authMiddleware], async (req, res, next) => {
    try {
      const accessToken = req.query.access_token || req.body.access_token || req.headers.authorization ? req.headers.authorization.split(' ')[1] : undefined
      const refreshToken = req.cookies.refresh_token
      if (!req.cookies.device_id || !refreshToken || !accessToken) {
        throw ApiException.BadRequest('Не корректные данные!')
      }
      let deviceID = req.cookies.device_id
      location = await bcrypt.hash(`${geoip.lookup(req.ip)?.country}/${geoip.lookup(req.ip)?.city}`, 4)
      if (!(await tokenService.validate(accessToken, refreshToken, deviceID, location))) throw ApiException.Unauthorized()
      let user = await db.query(`SELECT "U".* FROM "user" AS "U" INNER JOIN "token" AS "T" ON "U"."id" = "T"."id_user" WHERE "T"."access_token" = '${accessToken}' AND "T"."refresh_token" = '${refreshToken}'`).then(res => res.rows[0])
      delete user.password
      delete user.email
      delete user.activation_link
      delete user.created_at
      const tokens = tokenService.generate({id: user.id, location: location, deviceID: deviceID})
      await tokenService.save(user.id, tokens.accessToken, tokens.refreshToken, deviceID, location)
      res.cookie('device_id', deviceID, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV ? process.env.NODE_ENV == "production" : false
      })
      res.cookie('refresh_token', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV ? process.env.NODE_ENV == "production" : false
      })
      res.set('Authorization', `Bearer ${tokens.accessToken}`)
      res.json({access_token: tokens.accessToken, refresh_token: tokens.refreshToken, user})
    } catch (e) {
      next(e)
    }
  })
  /**
   * @swagger
   * /api/user:
   *   delete:
   *       description: Выход из аккаунта
   *       parameters:
   *         - name: refresh_token
   *           in: cookies
   *           required: true
   *           type: string
   *       responses:
   *           '200':
   *               description: возвращает logout
   * */
  router.delete(`/api/user`, [corsAllMiddleware, authMiddleware], async (req, res, next) => {
    try {
      const {refreshToken} = req.cookies
      const token = await tokenService.logout(refreshToken)
      res.clearCookie('refresh_token')
      res.json(token)
    } catch (e) {
      next(e)
    }
  })
  /**
   * @swagger
   * /api/user:
   *   put:
   *       description: Вход в аккаунт
   *       parameters:
   *         - name: email
   *           required: true
   *           in: body
   *           type: string
   *         - name: password
   *           required: true
   *           in: body
   *           type: string
   *         - name: device_id
   *           in: cookies
   *           required: true
   *           type: string
   *       responses:
   *           '200':
   *               description: возвращает access_token,refresh_token и user
   * */
  router.put(`/api/user`, [corsAllMiddleware, authNotMiddleware, body('email').isEmail(), body('password').isLength({
    min: 6, max: 32
  })], async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw ApiException.BadRequest('Не корректные данные!', errors.array())
      const {email, password} = req.body
      const user = await db.query(`SELECT * FROM "user" WHERE "email" = '${email}'`).then(res => res.rows[0])
      if (!user) throw ApiException.BadRequest('Пользователь не найден!')
      const isPasswordEquals = await bcrypt.compare(password, user.password)
      if (!isPasswordEquals) throw ApiException.Unauthorized()
      user.location = await bcrypt.hash(`${geoip.lookup(req.ip)?.country}/${geoip.lookup(req.ip)?.city}`, 4)
      let deviceID = uuid.v4()
      if (req.cookies.device_id) {
        deviceID = req.cookies.device_id
      }
      delete user.password
      delete user.email
      delete user.activation_link
      delete user.created_at
      delete user.location
      const tokens = tokenService.generate({id: user.id, location: user.location, deviceID: deviceID})
      await tokenService.save(user.id, tokens.accessToken, tokens.refreshToken, deviceID, user.location)
      console.log(req.headers.origin)
      res.cookie('device_id', deviceID, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV ? process.env.NODE_ENV == "production" : false
      })
      res.cookie('refresh_token', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV ? process.env.NODE_ENV == "production" : false
      })
      res.set('Authorization', `Bearer ${tokens.accessToken}`)
      res.json({access_token: tokens.accessToken, refresh_token: tokens.refreshToken, user})
    } catch (e) {
      next(e)
    }
  })
  /**
   * @swagger
   * /api/user:
   *   get:
   *       description: Данные о себе
   *       parameters:
   *         - name: access_token
   *           required: true
   *           in: headers
   *           type: string
   *         - name: refresh_token
   *           required: true
   *           in: cookies
   *           type: string
   *         - name: device_id
   *           in: cookies
   *           required: true
   *           type: string
   *       responses:
   *           '200':
   *               description: возвращает user
   * */
  router.get(`/api/user`, [corsAllMiddleware, authMiddleware], async (req, res, next) => {
    try {
      let access_token = req.query.access_token || req.body.access_token || req.headers.authorization ? req.headers.authorization.split(' ')[1] : undefined
      let refresh_token = req.query.refresh_token || req.body.refresh_token || req.cookies.refresh_token
      if (!access_token && !refresh_token) throw ApiException.Unauthorized()
      let user = await db.query(`SELECT "U".* FROM "user" AS "U" INNER JOIN "token" AS "T" ON "U"."id" = "T"."id_user" WHERE "T"."access_token" = '${access_token}' AND "T"."refresh_token" = '${refresh_token}'`).then(res => res.rows[0])
      delete user.password
      delete user.email
      delete user.activation_link
      delete user.created_at
      delete user.location
      res.json({user})
    } catch (e) {
      next(e)
    }
  })
  router.post(`/api/upload`, [corsMiddleware], async (req, res) => {
    res.json(await saveFiles(req.files))
  })
}
