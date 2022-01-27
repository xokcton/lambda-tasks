const fourthTask = async (event) => {
  const now = Date.now();
  const month = new Date(now).getMonth();
  const year = new Date(now).getFullYear();
  const days = new Date(year, month, 0).getDate();
  const currentDay = new Date().getDate();
  let serialNumber = currentDay - 1; // to get 

  if (month > 0) {
    for (let i = 0; i <= month - 1; i++) {
      serialNumber += new Date(year, i, 0).getDate();
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ serialNumber }),
  };
};

module.exports = { handler: fourthTask }
