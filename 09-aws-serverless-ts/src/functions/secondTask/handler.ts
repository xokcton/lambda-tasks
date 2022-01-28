import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@middlewares/formatJSONResponse';
import { formatJSONResponse } from '@middlewares/formatJSONResponse';
import { middyfy } from '@middlewares/middyfy';

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
