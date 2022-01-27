const thirdTask = async (event) => {
  const array = JSON.parse(JSON.parse(event.body).array)
  const n = JSON.parse(JSON.parse(event.body).n)
  const amount = n > array.length ? array.length : n
  const multiplication = array.slice(0, amount).reduce((acc, value) => acc *= value);
  const addition = array.slice(0, amount).reduce((acc, value) => acc += value);
  const result = {
    multiplication,
    addition
  };

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

module.exports = { handler: thirdTask }
