const PythonShell = require('python-shell').PythonShell;

class lib {
    ExecutePython(path = '', callback) {
        path = `${__dirname}\\python\\${path}.py`.replaceAll('\\\\', '/')
        PythonShell.run(path, null, function (err, results) {
            if (err) console.log(err);
            callback(results[0])
        });
    }
}
module.exports = new lib()
