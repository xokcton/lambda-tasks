const firstTask = async (event) => {
  const array = JSON.parse(JSON.parse(event.body).array)
  const idx = array.findIndex((elem, idx) => {
    if (elem >= 0) return idx
  })
  const result = {
    index: idx,
    number: array[idx]
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

module.exports = { handler: firstTask }
