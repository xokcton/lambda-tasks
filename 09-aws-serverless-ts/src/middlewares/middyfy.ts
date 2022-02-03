import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import { formatJSONResponse } from '@middlewares/formatJSONResponse';

export const middyfy = (handler) => {
  return middy(handler).use(middyJsonBodyParser()).use(formatJSONResponse())
}
