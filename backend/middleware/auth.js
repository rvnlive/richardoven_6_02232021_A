// Secret or Private Key (Token) generator for verification purpose
const jwt = require('jsonwebtoken')

// Secret or Private Key (Token) verification middleware
module.exports = (req, res, next) => {
  let token = req.headers.authorization
  if (!token) return res.status(401).send('Access denied / Unauthorized request')
  try {
    token = token.split(' ')[1]
    const decodedToken = jwt.verify(token, 'RANDOM_SECRET_TOKEN')
    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      throw Error || 'Invalid user ID'
    } else {
      // req.body.userId = userId
      next()
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    })
  }
}
