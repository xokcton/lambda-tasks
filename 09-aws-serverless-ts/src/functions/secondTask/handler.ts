import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const secondTask: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const array = JSON.parse(event.body.array);
  const result = {
    sum: array.filter((elem) => elem >= 0).reduce((acc, value) => acc += value)
  };

  return formatJSONResponse({
    result,
  });
}

export const main = middyfy(secondTask);
