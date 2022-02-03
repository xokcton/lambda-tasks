import 'source-map-support/register';

import { middyfy } from '@middlewares/middyfy';

const firstTask = async (event) => {
  const array = JSON.parse(event.body.array);
  const idx = array.findIndex((elem, idx) => {
    if (elem >= 0) return idx
  });
  const result = {
    index: idx,
    number: array[idx]
  };
  
  return {
    result
  };
}

export const main = middyfy(firstTask)