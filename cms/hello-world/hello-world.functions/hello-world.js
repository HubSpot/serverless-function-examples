// This function is executed when a request is made to the endpoint associated with this file in the serverless.json file
exports.main = (functionContext, sendResponse) => {
  sendResponse({ body: 'Hello World', statusCode: 200 });
};
