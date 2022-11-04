const authMiddleware = require('./middleware/auth.middleware')
const authNotMiddleware = require('./middleware/auth.not.middleware')
const corsMiddleware = require('./middleware/cors.middleware')
const corsAllMiddleware = require('./middleware/cors.all.middleware')
const tokenService = require('./service/token.service')
const ApiException = require('./exception/api.exception')
const {body, validationResult} = require('express-validator');
const db = require('./database')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const geoip = require('geoip-lite')
module.exports = router => {
    /**
     * @swagger
     * /api:
     *   get:
     *       description: AwesomeDescription
     *       responses:
     *           '200':
     *               description: all right
     * */
    router.get(`/api`, [corsAllMiddleware], (req, res, next) => {
        try {
            res.json({data: `${geoip.lookup(req.ip).country}/${geoip.lookup(req.ip).city}`})
        } catch (e) {
            next(e)
        }
    })
    router.get(`/api/auth`, [corsMiddleware, authMiddleware], (req, res, next) => {
        try {
            res.json({data: "cool"})
        } catch (e) {
            next(e)
        }
    })
    router.post(`/api/user`, [corsMiddleware, body('email').isEmail(), body('password').isLength({
        min: 6, max: 32
    }), authNotMiddleware], async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) throw ApiException.BadRequest('не корректные данные!', errors.array())
            const candidate = {
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 4),
                activation_link: uuid.v4(),
                location: await bcrypt.hash(`${geoip.lookup(req.ip)?.country}/${geoip.lookup(req.ip)?.city}`, 4)
            }
            if (await db.query(`SELECT * FROM "user" WHERE "email" = '${candidate.email}'`).then(result => result.rowCount) > 0) throw ApiException.BadRequest('пользователь уже зарегистрирован!', [])
            const user = await db.query(`INSERT INTO "user" ("email","password","activation_link") VALUES ('${candidate.email}','${candidate.password}','${candidate.activation_link}') RETURNING "id","email","password","is_activated"`).then(result => result.rows[0])
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
            res.json({...tokens, user})
        } catch (e) {
            next(e)
        }
    })
    router.put(`/api/user/refresh`, [corsMiddleware, authMiddleware], (req, res, next) => {
        try {
            res.json({data: "cool"})
        } catch (e) {
            next(e)
        }
    })
    router.put(`/api/user/logout`, [corsMiddleware, authMiddleware], async (req, res, next) => {
        try {
            const {refreshToken} = req.cookies
            const token = await tokenService.logout(refreshToken)
            res.clearCookie('refresh_token')
            res.json(token)
        } catch (e) {
            next(e)
        }
    })
    router.put(`/api/user/login`, [corsMiddleware, body('email').isEmail(), body('password').isLength({
        min: 6, max: 32
    }), authNotMiddleware], async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) throw ApiException.BadRequest('не корректные данные!', errors.array())
            const {email, password} = req.body
            const user = await db.query(`SELECT "id","email","password","is_activated" FROM "user" WHERE "email" = '${email}'`).then(res => res.rows[0])
            if (!user) throw ApiException.BadRequest('Пользователь не найден!')
            const isPasswordEquals = await bcrypt.compare(password, user.password)
            if (!isPasswordEquals) throw ApiException.Unauthorized()
            user.location = await bcrypt.hash(`${geoip.lookup(req.ip)?.country}/${geoip.lookup(req.ip)?.city}`, 4)
            let deviceID = uuid.v4()
            if (req.cookies.device_id) {
                deviceID = req.cookies.device_id
            }
            const tokens = tokenService.generate({id: user.id, location: user.location, deviceID: deviceID})
            await tokenService.save(user.id, tokens.accessToken, tokens.refreshToken, deviceID, user.location)
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
            res.json({...tokens, user})
        } catch (e) {
            next(e)
        }
    })
}
