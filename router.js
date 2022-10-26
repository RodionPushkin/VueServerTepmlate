const {AuthGuard, ExecutePython, GenerateToken, Connect, Disconnect} = require('./lib')
let connected = []
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
    router.get(`/api/`, (req, res) => {
        // req.session.views =
        if(!req.session.views) req.session.views = 0
        req.session.views++
        res.json({data: [req.session.views, GenerateToken("text")]})
    })
    router.get(`/api/execute`, AuthGuard, (req, res) => {
        ExecutePython('file', (result => {
            res.json({data: [result, GenerateToken("text")]})
        }))
    })
    router.get('/api/connect/', async (req, res) => {
        connected = await Connect(connected, req, res)
        req.on('close', async () => {
            connected = await Disconnect(connected, req, res)
        })
    })
}
