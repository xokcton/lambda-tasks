const costCalculation = (file, lang, symbolsCount) => {
  const extArr = ['doc', 'docx', 'rtf']
  const uaRuMin = 50
  const engMin = 120
  const uaRu1SymbolCost = 0.05
  const eng1SymbolCost = 0.12
  const extraPercentage = 20
  let finalSumm = 0

  if (lang === 'ru' || lang === 'ua') {
    const tmp = +(symbolsCount * uaRu1SymbolCost).toFixed(2)
    finalSumm = tmp >= uaRuMin ? tmp : uaRuMin
  } else {
    const tmp = +(symbolsCount * eng1SymbolCost).toFixed(2)
    finalSumm = tmp >= engMin ? tmp : engMin
  }

  if (extArr.indexOf(file.split('.').reverse()[0]) === -1) {
    finalSumm += +(finalSumm / 100 * extraPercentage).toFixed(2)
  }

  return +finalSumm.toFixed(2)
}

const dateCalculating = seconds => {
  const date = new Date()
  const startOfTheDay = 10 // 10:00
  const endOfTheDay = 19 // 19:00
  const millisecondsPerHour = 60 * 60 * 1000
  const workingHours = endOfTheDay - startOfTheDay // one working day
  const outOfWorkOffset = (24 - workingHours) * millisecondsPerHour // from 19:00 to 10:00 monday to friday
  const weekendOffset = 24 * 2 * millisecondsPerHour // saturday & sunday
  let currentDay = date.getDay()
  let currentHour = date.getHours()
  let currentMinutes = date.getMinutes()
  let requiredMilliseconds = 0
  let timeOffset = 0 // 10:00 AM
  let timeDiff = 0 // if im between 10:00 and 19:00

  // if start on weekend
  if (currentDay === 6 || currentDay === 0) {
    let offset = (24 - currentHour + 10) * millisecondsPerHour
    if (currentMinutes > 0) {
      offset -= 1
      offset += (60 - currentMinutes) * 60 * 1000
    }
    requiredMilliseconds += (currentDay === 6) ? (offset + weekendOffset / 2) : offset
    currentDay = 1
    currentHour = 10
    currentMinutes = 0
  }

  if (currentHour > endOfTheDay || currentHour < startOfTheDay) {
    timeOffset = currentHour < startOfTheDay ? (startOfTheDay - currentHour) : (24 - currentHour + startOfTheDay)
    if (currentHour > endOfTheDay) {
      currentDay++
    }
    if (currentMinutes > 0) {
      timeOffset -= 1
      timeOffset = timeOffset * millisecondsPerHour + ((60 - currentMinutes) * 60 * 1000)
    }
  } else {
    if (currentMinutes > 0) {
      timeDiff = (endOfTheDay - currentHour - 1) * millisecondsPerHour + ((60 - currentMinutes) * 60 * 1000)
    } else {
      timeDiff = (endOfTheDay - currentHour) * millisecondsPerHour
    }
    timeOffset = outOfWorkOffset
  }

  if ((seconds * 1000) > timeDiff) {
    requiredMilliseconds += timeOffset + timeDiff
    seconds -= timeDiff / 1000

    if ((seconds * 1000) < (workingHours * millisecondsPerHour)) {
      requiredMilliseconds += seconds * 1000
    } else {
      const wholePart = ~~(seconds * 1000 / (workingHours * millisecondsPerHour))
      const fractionalPart = (seconds * 1000) % (workingHours * millisecondsPerHour)
      for (let index = 0; index <= wholePart; index++) {
        requiredMilliseconds += 24 * millisecondsPerHour
        currentDay++
        if (currentDay === 6) {
          currentDay = 1
          requiredMilliseconds += 24 * millisecondsPerHour
        }
      }
      requiredMilliseconds += fractionalPart
    }
  } else {
    requiredMilliseconds += seconds * 1000
  }

  return {
    avgTime: seconds,
    date: new Date(Date.now() + requiredMilliseconds)
  }
}

const deadlineCalculation = (file, lang, symbolsCount) => {
  const extArr = ['doc', 'docx', 'rtf']
  const minTime = 60 * 60 // 1 hour
  const uaRuSymbolsPerHour = 1333
  const engSymbolsPerHour = 333
  const extraPercentage = 20
  let avgTime = 30 * 60 // 30 mins
  let tmp = 0

  if (lang === 'ru' || lang === 'ua') {
    tmp = Math.round((symbolsCount * minTime) / uaRuSymbolsPerHour)
  } else {
    tmp = Math.round((symbolsCount * minTime) / engSymbolsPerHour)
  }

  avgTime = ((avgTime + tmp) > minTime) ? (avgTime + tmp) : minTime

  if (extArr.indexOf(file.split('.').reverse()[0]) === -1) {
    avgTime += Math.round(avgTime / 100 * extraPercentage)
  }

  return dateCalculating(avgTime)
}

// price
// console.log(costCalculation('test.none', 'en', 1234))
// deadline
// const { avgTime, date } = deadlineCalculation('test.txt', 'ru', 50000)
// console.log(`Срок сдачи: ${(date.getDate() > 9 ? date.getDate() : '0' + date.getDate())}.${(date.getMonth() + 1 > 9 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)))}.${date.getFullYear()} в ${(date.getHours() < 10) ? ('0' + date.getHours()) : (date.getHours())}:${(date.getMinutes() < 10) ? ('0' + date.getMinutes()) : (date.getMinutes())}`)

module.exports = {
  costCalculation,
  deadlineCalculation
}
