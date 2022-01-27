const fifthTask = async (event) => {
  const array = JSON.parse(event.body).array;
  const sortedByName = array.slice().sort((a, b) => a['firstName'] > b['firstName'] ? 1 : -1);
  const sortedByDate = array.slice()
    .map(elem => {
      elem.birthDate = + new Date(elem.birthDate);
      return elem;
    })
    .sort((a, b) => a['birthDate'] < b['birthDate'] ? 1 : -1)
    .map(elem => {
      elem.birthDate = new Date(elem.birthDate).toLocaleDateString();
      return elem;
    });
  const result = { sortedByName, sortedByDate };

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

module.exports = { handler: fifthTask }
