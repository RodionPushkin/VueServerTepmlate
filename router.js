const authMiddleware = require('./middleware/auth.middleware')
const corsMiddleware = require('./middleware/cors.middleware')
const corsAllMiddleware = require('./middleware/cors.all.middleware')
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
    router.get(`/api/auth`, [corsAllMiddleware,authMiddleware], (req, res) => {
        res.json({data: "cool"})
    })
}