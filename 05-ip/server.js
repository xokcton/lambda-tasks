import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { getIP, getInfo } from './getInfo.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/geoposition', async (req, res) => {
  try {
    const result = await getInfo()

    res.status(200).send(result)
  } catch (error) {
    res.status(404).send({ message: "Something went wrong" })
  }
})

app.listen(PORT)