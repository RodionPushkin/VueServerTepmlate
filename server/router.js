const authMiddleware = require('./middleware/auth.middleware')
const authNotMiddleware = require('./middleware/auth.not.middleware')
const corsMiddleware = require('./middleware/cors.middleware')
const corsAllMiddleware = require('./middleware/cors.all.middleware')
const tokenService = require('./service/token.service')
const libService = require('./service/lib.service')
const ApiException = require('./exception/api.exception')
const {body, validationResult} = require('express-validator');
const db = require('./database')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const geoip = require('geoip-lite')
const path = require('path')
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
      res.json({data: `${geoip.lookup(req.ip).country}/${geoip.lookup(req.ip).city}`})
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
      res.json({access_token: tokens.accessToken,refresh_token: tokens.refreshToken, user})
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
      res.json({access_token: tokens.accessToken,refresh_token: tokens.refreshToken, user})
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
      res.json({access_token: tokens.accessToken,refresh_token: tokens.refreshToken, user})
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
      global.peer.emit('huy')
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
    // console.log(req.files.file);
    let newFileName = `${new Date().getTime()}.csv`
    console.log(path.join(__dirname, "/python/", `${newFileName}`))
    req.files.file.mv(path.join(__dirname, "/python/", `${newFileName}`), () => {
    })
    setTimeout(() => {
      res.json('ok')
    }, 20000)

  })
  router.get(`/api/python`, [corsAllMiddleware], async (req, res) => {
    let data = await libService.ExecutePython('test', JSON.stringify({"data": "python is working"}))
    if (data == "error of execution") {
      res.json(data)
    } else {
      res.json(JSON.parse(data.replaceAll("'", '"')))
    }
  })
}
