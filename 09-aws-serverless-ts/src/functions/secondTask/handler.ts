import 'source-map-support/register';

import { middyfy } from '@middlewares/middyfy';

const secondTask = async (event) => {
  const array = JSON.parse(event.body.array);
  const result = {
    sum: array.filter((elem) => elem >= 0).reduce((acc, value) => acc += value)
  };

  return {
    result
  };
}

export const main = middyfy(secondTask);
