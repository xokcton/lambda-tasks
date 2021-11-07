const express = require('express')
const bodyParser = require('body-parser')
const { costCalculation, deadlineCalculation } = require('./correctarium.js')
const PORT = 3000

const app = express()

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/calculate', (req, res) => {
  /* 
    Request example:
    {
      "language": "en",
      "mimetype": "rtf",
      "count": 10000
    }
  */
  try {
    const { language, mimetype, count } = req.body
    const money = costCalculation(mimetype, language, count)
    const { avgTime, date } = deadlineCalculation(mimetype, language, count)
    const response = {
      price: money,
      time: +(avgTime / 60 / 60).toFixed(2),
      deadline: date.getTime(),
      deadline_date: `Срок сдачи: ${(date.getDate() > 9 ? date.getDate() : '0' + date.getDate())}.${(date.getMonth() + 1 > 9 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)))}.${date.getFullYear()} в ${(date.getHours() < 10) ? ('0' + date.getHours()) : (date.getHours())}:${(date.getMinutes() < 10) ? ('0' + date.getMinutes()) : (date.getMinutes())}`
    }

    res.status(200).send(response)
  } catch (error) {
    console.error(error)
  }
})

app.listen(PORT)