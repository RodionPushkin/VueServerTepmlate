const {AuthGuard, ExecutePython, GenerateToken, Connect, Disconnect} = require('./lib')
let connected = []
module.exports = router => {
    router.get(`/api/`, AuthGuard, (req, res) => {
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
