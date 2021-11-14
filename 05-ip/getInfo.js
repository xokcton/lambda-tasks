import axios from 'axios'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()
const URL = process.env.API_URL
const KEY = process.env.API_KEY

const ipToInt32 = ip => ip.split`.`.reduce((r, e) => r * 256 + +e)
const int32ToIp = num => (num >>> 24 & 0xFF) + '.' + (num >>> 16 & 0xFF) + '.' + (num >>> 8 & 0xFF) + '.' + (num & 0xFF)
const readFile = (name = 'IP2LOCATION-LITE-DB1.CSV') => [...fs.readFileSync(name, "utf8").split("\n")]

export const getIP = async (uri, apiKey) => {
  const url = uri + apiKey
  const { data } = await axios.get(url)
  return data
}

export const getInfo = async () => {
  const csv = readFile()
  const { ip, country_code } = await getIP(URL, KEY)
  const userIpInDec = ipToInt32(ip)
  const newArr = []
  const result = {}

  csv.forEach(elem => {
    if (elem.match(new RegExp(country_code, 'gm'))) {
      newArr.push(elem)
    }
  })

  newArr.forEach(elem => {
    const val1 = parseInt(elem.split("\"")[1])
    const val2 = parseInt(elem.split("\"")[3])

    if (+userIpInDec >= val1 && +userIpInDec <= val2) {
      result.firstIp = int32ToIp(val1),
        result.lastIp = int32ToIp(val2),
        result.country_code = country_code,
        result.country = elem.split("\"")[7]
    }
  })

  return result
}