export const formatJSONResponse = () => {
  return {
    after: async (request) => {
      const result = request.response.result;
      request.response = {
        statusCode: 200,
        body: JSON.stringify(result)
      }
    }
  }
}
