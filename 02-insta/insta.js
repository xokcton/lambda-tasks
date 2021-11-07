const fs = require("fs")
const fileNames = []

fs.readdirSync('200kfiles/').forEach(file => {
  fileNames.push(file)
})

const readFile = name => [...fs.readFileSync(name, "utf8").split("\n")]

const uniqueValues = prefix => {
  let amount = 0

  fileNames.forEach(fileName => {
    const values = readFile(`${prefix}${fileName}`).sort()
    for (let index = 0; index < values.length; index++) {
      if (values[index] !== values[index - 1] && values[index] !== values[index + 1]) amount++
    }
  })

  return amount
}

const existInAllFiles = prefix => {
  let result = readFile(`${prefix}${fileNames[0]}`).sort()

  for (let index = 1; index < fileNames.length; index++) {
    const values = readFile(`${prefix}${fileNames[index]}`).sort()
    const tempArray = []
    result.forEach(el => {
      if (values.indexOf(el) !== -1) {
        tempArray.push(el)
      }
    })
    result = tempArray
  }

  return result.length
}

const existInAtLeastTen = prefix => {
  const passedValues = []

  fileNames.forEach(fileName => {
    const initialValues = readFile(`${prefix}${fileName}`).sort()
    for (let index = 0; index < initialValues.length; index++) {
      if (passedValues.indexOf(initialValues[index]) !== -1) {
        continue
      }
      let tmp = 1
      for (let j = 0; j < fileNames.length; j++) {
        if (fileName === fileNames[j]) {
          continue
        }
        const secondaryValues = readFile(`${prefix}${fileNames[j]}`).sort()
        if (secondaryValues.indexOf(initialValues[index]) !== -1) {
          tmp++
        }
        if (tmp === 10) {
          passedValues.push(initialValues[index])
          break
        }
      }
    }
  })

  return passedValues.length
}

// 1
console.log('Number of unique values among 200k:', uniqueValues('200kfiles/'))
// console.log('Number of unique values among 2kk:', uniqueValues('2kkfiles/'))

// 2
// console.log('Number of values in all files(200k):', existInAllFiles('200kfiles/'))
// console.log('Number of values in all files(2kk):', existInAllFiles('2kkfiles/'))

// 3
// console.log('Number of values in at least 10 files(200k):', existInAtLeastTen('200kfiles/'))
// console.log('Number of values in at least 10 files(2kk):', existInAtLeastTen('2kkfiles/'))