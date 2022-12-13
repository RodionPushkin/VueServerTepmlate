const ApiException = require('../exception/api.exception')
const tokenService = require("../service/token.service");
module.exports = async (err, req, res, next) => {
  if (err instanceof ApiException) {
    if (err.errors[0] == "logout") {
      const {refreshToken} = req.cookies
      const token = await tokenService.logout(refreshToken)
      res.clearCookie('refresh_token')
      return res.json("logout")
    } else if (err.errors[0] == "refresh") {
      return res.redirect(`https://${process.env.DOMAIN}/api/user/refresh`)
    } else {
      console.log(err.message)
      return res.status(err.status).json({message: err.message, errors: err.errors})
    }
  }
  console.log(err)
  res.status(500).json({message: "Непредвиденная ошибка"})
}