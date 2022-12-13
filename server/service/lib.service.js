const p = require('path');
const PythonShell = require('python-shell').PythonShell;
class lib {
  async ExecutePython(path = '', data) {
    let options = {
      mode: 'text',
      pythonOptions: ['-u'], // get print results in real-time
      scriptPath: p.join(__dirname, "../python/"),
      args: [data]
    };
    let runPy =  new Promise( (success, nosuccess) =>{
      PythonShell.run(`${path}.py`, options, async function (err, results) {
        if (err){
          nosuccess(err)
        }else{
          success(results)
        }
      });
    })
    return await runPy.then((res) => {
      return res.toString('utf8')
    }).catch((err) => {
      return "error of execution"
      console.log(err.toString('utf8'))
    })
  }
}

module.exports = new lib()

