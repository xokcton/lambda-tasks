const secondTask = async (event) => {
  const array = JSON.parse(JSON.parse(event.body).array)
  const result = {
    sum: array.filter((elem) => elem >= 0).reduce((acc, value) => acc += value)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

module.exports = { handler: secondTask }
