import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const fourthTask = async (event) => {
  console.log(event);
  const now = Date.now();
  const month = new Date(now).getMonth();
  const year = new Date(now).getFullYear();
  const currentDay = new Date().getDate();
  let serialNumber = currentDay - 1; // to get index

  if (month > 0) {
    for (let i = 0; i <= month - 1; i++) {
      serialNumber += new Date(year, i, 0).getDate();
    }
  }

  const result = {
    serialNumber
  }

  return formatJSONResponse({
    result,
  });
}

export const main = middyfy(fourthTask);