import jwt from "jsonwebtoken"

const getRandomInt = (min = 30, max = 60) => Math.floor(Math.random() * (max - min + 1)) + min

export const generateAccessToken = (email, secret) => {
  const accessToken = jwt.sign(email, secret, { expiresIn: `${getRandomInt()}s` })
  const refreshToken = jwt.sign(email, secret, { expiresIn: `${7 * 24 * 3600}s` }) // 7 days
  return {
    accessToken,
    refreshToken
  }
}

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(401).send({ message: 'There is no token speified!' })
  jwt.verify(token, process.env.TOKEN_SECRET, (err, email) => {
    if (err) return res.status(401).send({ message: "Unauthorised error!" })
    req.email = email
    next()
  })
}