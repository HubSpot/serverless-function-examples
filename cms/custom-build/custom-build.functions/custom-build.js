// faker can be required in because it has been added to package.json
// and `hs functions deploy <pathToCustomBuildDotFunctionsFolder>` has been run
const faker = require('faker');

exports.main = (functionContext, sendResponse) => {
  const { params } = functionContext;

  sendResponse({ body: {
    name: faker.name.findName(),
    email: faker.internet.email(),
    // This will include any query params added to the URL to the function output
    params,
    contactCard: faker.helpers.createCard()
  }, statusCode: 200 });
};
