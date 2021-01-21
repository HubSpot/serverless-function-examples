// dayjs can be required in because it has been added to package.json
// and `hs functions deploy <pathToCustomBuildDotFunctionsFolder>` has been run
const dayjs = require('dayjs')

exports.main = (functionContext, sendResponse) => {
  sendResponse({ body: {
    // Time is in GMT
    oneWeekFromNow: dayjs().add('1', 'week').format('MM-DD-YYYY hh:mm:ssA')
  }, statusCode: 200 });
};
