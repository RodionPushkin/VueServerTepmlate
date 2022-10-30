const ApiException = require('../exception/api.exception')
module.exports = (err, req, res, next) => {
    console.log(err)
    if (err instanceof ApiException) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    res.status(500).json({message: "Непредвиденная ошибка"})
}