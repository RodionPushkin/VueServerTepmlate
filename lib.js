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
        connected.push({id: req.rid, req: req, res: res})
        return await connected
    }

    async Disconnect(connected, req, res) {
        return connected.filter(item => req.rid == item.id)
    }

    async Notify(id, data = []) {

    }
}

module.exports = new lib()
