// faker can be required in because it has been added to package.json
// and `hs functions deploy <pathToCustomBuildDotFunctionsFolder>` has been run
const faker = require('faker');

exports.main = (functionContext, sendResponse) => {
  sendResponse({ body: {
    name: faker.name.findName(),
    email: faker.internet.email(),
    contactCard: faker.helpers.createCard()
  }, statusCode: 200 });
};
