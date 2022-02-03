import 'source-map-support/register';

import { middyfy } from '@middlewares/middyfy';

const thirdTask = async (event) => {
  const array = JSON.parse(event.body.array);
  const n = JSON.parse(event.body.n);
  const amount = n > array.length ? array.length : n;
  const multiplication = array.slice(0, amount).reduce((acc, value) => acc *= value);
  const addition = array.slice(0, amount).reduce((acc, value) => acc += value);
  const result = {
    multiplication,
    addition
  };

  return {
    result
  };
}

export const main = middyfy(thirdTask);
