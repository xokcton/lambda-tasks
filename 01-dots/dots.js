const insertDots = (str) => {
  let tmp = [str[0]]
  for (let index = 1; index < str.length; index++) {
    const newStr = tmp.slice().map(element => element + '.')
    tmp = [...newStr, ...tmp].map(element => element + str[index])
  }
  return tmp
}

console.log(insertDots('abcd'))
