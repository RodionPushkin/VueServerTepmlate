const db = require("./database");
const config = require("./config.json");
const PythonShell = require('python-shell').PythonShell;

class lib {
    async AuthGuard(req, res, next) {
        if (req.session.views) {
            req.session.views++
        } else {
            req.session.views = 0
        }
        if (req.query.token || req.cookies.token || req.headers.authorization) {
            const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.cookies.token ? req.cookies.token : req.query.token
            // проверка токена в бд и тд и тп хааахха
            next()
        } else {
            res.status(401).json({error: 'unauthorized'})
        }
    }

    GenerateToken(text) {
        return text
    }

    ExecutePython(path = '', callback) {
        path = `${__dirname}\\python\\${path}.py`.replaceAll('\\\\', '/')
        PythonShell.run(path, null, function (err, results) {
            if (err) console.log(err);
            callback(results[0])
        });
    }

    async Connect(connected, req, res) {
        return await db.query(`INSERT INTO "connection" (id,id_user) VALUES ('${req.rid}',1)`).then(() => {
            connected.push({id: req.rid, req: req, res: res})
            return connected
        })
    }

    async Disconnect(connected, req, res) {
        return await db.query(`DELETE FROM "connection" WHERE id='${req.rid}'`).then(() => {
            connected.filter(item => req.rid == item.id)
            return connected
        })
    }

    async Notify(connected, id) {
        if (Array.isArray(id)) {
            return await db.query(`SELECT * FROM "connection" WHERE id_user=${id[0]}`).then(res => res.rows).then(connections => {
                connections.forEach(connection => {
                    connection = connected.find(item => item.id == connection.id)
                    connection.res.json('some new prikoli')
                    connected.filter(conn => conn.id == connection.id)
                })
                return connected
            })
        } else {
            return await db.query(`SELECT * FROM "connection" WHERE id_user=${id}`).then(res => res.rows).then(connections => {
                connections.forEach(connection => {
                    // console.log(connected)
                    // console.log(connection)
                    connection = connected.find(item => item.id == connection.id)
                    connection.res.json('some new prikoli')
                    connected.filter(conn => conn.id == connection.id)
                })
                return connected
            })
        }
    }
}

module.exports = new lib()
