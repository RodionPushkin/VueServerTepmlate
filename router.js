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
    router.get(`/api`, [corsMiddleware], (req, res) => {
        res.json({data: "cool"})
    })
    router.get(`/api/auth`, [corsAllMiddleware, authMiddleware], (req, res) => {
        res.json({data: "cool"})
    })
    router.post(`/api/user`, [corsMiddleware, body('email').isEmail(), body('password').isLength({
        min: 6,
        max: 32
    }), authNotMiddleware], async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) throw ApiException.BadRequest('не корректные данные!', errors.array())
            const candidate = {
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 4),
                activation_link: uuid.v4()
            }
            if (await db.query(`SELECT * FROM "user" WHERE "email" = '${candidate.email}'`).then(result => result.rowCount) > 0) throw ApiException.BadRequest('пользователь уже зарегистрирован!', [])
            const user = await db.query(`INSERT INTO "user" ("email","password","activation_link") VALUES ('${candidate.email}','${candidate.password}','${candidate.activation_link}') RETURNING "id","email","password","activation_link"`).then(result => result.rows[0])
            const tokens = tokenService.generate(user)
            const deviceID = uuid.v4()
            await tokenService.save(user.id, tokens.refreshToken, deviceID)
            res.cookie('deviceID', deviceID, {maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true, secure: process.env.NODE_ENV ? process.env.NODE_ENV == "production" : false})
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: process.env.NODE_ENV ? process.env.NODE_ENV == "production" : false})
            console.log(await tokenService.validate(tokens.accessToken, deviceID))
            delete user.id
            res.json({...tokens, user})
        } catch (e) {
            next(e)
        }
    })
}