import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@middlewares/formatJSONResponse';
import { formatJSONResponse } from '@middlewares/formatJSONResponse';
import { middyfy } from '@middlewares/middyfy';

import schema from './schema';

const firstTask: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const array = JSON.parse(event.body.array);
  const idx = array.findIndex((elem, idx) => {
    if (elem >= 0) return idx
  });
  const result = {
    index: idx,
    number: array[idx]
  };
  
  return formatJSONResponse({
    result,
  });
}

export const main = middyfy(firstTask)