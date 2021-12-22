import fs from 'fs'

const inputData = JSON.parse(fs.readFileSync("./input.json", "utf8")).sort((a, b) => a.user.name.localeCompare(b.user.name))
const outputData = []
let tmpArray = []
let tmpObj = {}

for (let index = 0; index < inputData.length; index++) {
  const element = inputData[index]
  tmpObj.userId = element.user._id
  tmpObj.name = element.user.name
  tmpArray.push({
    startDate: element.startDate,
    endDate: element.endDate
  })
  if (inputData[index + 1] && element.user._id !== inputData[index + 1].user._id) {
    tmpObj.weekendDates = [...tmpArray]
    outputData.push(tmpObj)
    tmpArray = []
    tmpObj = {}
  }
}

fs.writeFileSync("./output.json", JSON.stringify(outputData))