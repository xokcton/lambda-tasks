import axios from 'axios'
import routes from './routes.js'
import axiosRetry from "axios-retry"

axiosRetry(axios, {
  retries: 3,
  retryCondition: error => error.response.status === 429
})

const getResponse = async uri => axios.get(uri)
const formatResponse = (uri, value) => `${uri}: isDone - ${value}\n`

const getIsDoneProperty = obj => {
  const keys = Object.keys(obj)
  if (keys.indexOf('isDone') !== -1) return obj.isDone
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      return getIsDoneProperty(obj[key])
    }
  }
}

const bootstrap = async () => {
  let result = ''
  let truthyValues = 0
  let length = routes.length

  for (const url of routes) {
    let res
    try {
      res = await getResponse(url)
    } catch (error) {
      result += `${url}: ${error.response.status} - ${error.response.statusText}\n`
      length--
      continue
    }
    const isDone = getIsDoneProperty(res.data)
    result += formatResponse(url, isDone)
    truthyValues = isDone ? truthyValues + 1 : truthyValues
  }

  result += `\nЗначений True: ${truthyValues},\nЗначений False: ${length - truthyValues}\n\n`
  console.log(result)
}

bootstrap()