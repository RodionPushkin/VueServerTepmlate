const CORS = require('cors')
const whitelist = [process.env.DOMAIN,'http://localhost']
module.exports = CORS({
    credentials: true,
    methods: ['OPTION', 'GET', 'POST', 'PUT', 'DELETE'],
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    }
})