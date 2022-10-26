const {Client} = require('pg');
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

class DB {
    async query(text, params, callback) {
        return client.query(text, params, callback)
    }

    async checkConnection() {
        client.connect();
        await client.query('SELECT NOW()', (err, res) => {
            if (!err) {
                console.log("database connected at", new Date(res.rows[0].now).toLocaleString())
                return res.rows
            }
            console.log(err)
            client.end()
        })
    }
}

module.exports = new DB()
