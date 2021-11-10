import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import mongodb from 'mongodb'
import { generateAccessToken, authenticateToken } from './jwt.js'

dotenv.config()
const MongoClient = mongodb.MongoClient
const PORT = process.env.PORT || 4000
const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.3buzh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const app = express()

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT)

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('authorization')
    const usersCollection = db.collection('users')
    const userTokenCollection = db.collection('userToken')

    // user registration
    app.post('/sign_up', async (req, res) => {
      const { email, password } = req.body
      if (!email && !password) {
        res.status(400).send({ message: 'Please, specify your email and password!' })
      }

      try {
        const user = await usersCollection.findOne({ email })
        if (user) {
          res.status(400).send({ message: 'A user with this email address exists' })
        }

        const result = await usersCollection.insertOne({ email, password })
        res.status(201).send(result)
      } catch (error) {
        res.status(404).send({ message: 'Something went wrong! Please try again' })
      }
    })

    // user login
    app.post('/login', async (req, res) => {
      const { email, password } = req.query
      if (!email && !password) {
        res.status(400).send({ message: 'Please, specify your email and password!' })
      }

      try {
        const user = await usersCollection.findOne({ email })
        if (!user) {
          res.status(404).send({ message: 'There is no user with such an email' })
        }
        if (user.email !== email || user.password !== password) {
          res.status(400).send({ message: 'Email or password is incorrect' })
        }

        const { accessToken, refreshToken } = generateAccessToken({ email }, process.env.TOKEN_SECRET)
        await userTokenCollection.insertOne({ accessToken, refreshToken, userId: user._id })

        res.status(200).send({ accessToken })
      } catch (error) {
        res.status(404).send({ message: 'Something went wrong! Please try again' })
      }
    })

    // get user
    app.get('/me[0-9]', authenticateToken, (req, res) => {
      const pathNumber = req.path.split('').reverse()[0]
      const { email } = req.email

      res.status(200).send({ request_num: pathNumber, data: { email } })
    })

    // refresh token
    app.post('/refresh', authenticateToken, async (req, res) => {
      const { email } = req.email
      const { accessToken } = generateAccessToken({ email }, process.env.TOKEN_SECRET)

      try {
        const user = await usersCollection.findOne({ email })
        if (!user) {
          res.status(404).send({ message: 'There is no user with such an email' })
        }
        await userTokenCollection.findOneAndUpdate({ userId: user._id },
          {
            $set: {
              accessToken
            }
          },
          {
            upsert: true
          })

        res.status(200).send({ accessToken })
      } catch (error) {
        res.status(404).send({ message: 'Something went wrong! Please try again' })
      }
    })

  })
  .catch(error => console.error(error))