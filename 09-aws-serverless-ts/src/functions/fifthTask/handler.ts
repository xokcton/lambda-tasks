import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

type ResponseArray = {
  firstName: string,
  lastName: string,
  birthDate: string | number,
}

const fifthTask: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const array: ResponseArray[] = event.body.array as ResponseArray[];
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
  
  return formatJSONResponse({
    result,
  });
}

export const main = middyfy(fifthTask);
