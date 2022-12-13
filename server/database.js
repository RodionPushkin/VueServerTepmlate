const {Client} = require('pg');
const config = require('../config.json')
const client = new Client({
  user: String(config.DB_USER),
  host: config.DB_HOST,
  database: config.DB_DATABASE,
  password: String(config.DB_PASS),
  port: config.DB_PORT,
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
