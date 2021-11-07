const getPossibleCombinations = (arr, letter) => {
  const combinations = []

  for (let index = 0; index < arr.length; index++) {
    combinations.push(`${arr[index]}${letter}`)
    combinations.push(`${arr[index]}.${letter}`)
  }

  return combinations
}

const insertDots = (arr) => {
  let tmp = [arr[0]]

  for (let index = 1; index < arr.length; index++) {
    tmp = [...getPossibleCombinations(tmp, arr[index])]
  }

  return tmp
}

console.log(insertDots('abcd'))
