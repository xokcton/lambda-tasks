import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const thirdTask: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const array = JSON.parse(event.body.array);
  const n = JSON.parse(event.body.n);
  const amount = n > array.length ? array.length : n;
  const multiplication = array.slice(0, amount).reduce((acc, value) => acc *= value);
  const addition = array.slice(0, amount).reduce((acc, value) => acc += value);
  const result = {
    multiplication,
    addition
  };

  return formatJSONResponse({
    result,
  });
}

export const main = middyfy(thirdTask);
