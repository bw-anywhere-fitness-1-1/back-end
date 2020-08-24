const jwt = require('jsonwebtoken')
const secret = require('../secrets')



module.exports = (req, res,next) => {
  const userType = req.jwt.authCode
  console.log(req.jwt.authCode)

        if(userType === 111){
            res.status(401).json({you : 'Shall not pass'})
        } else {
            next()
        }

}