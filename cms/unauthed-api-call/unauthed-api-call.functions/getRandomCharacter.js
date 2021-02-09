const axios = require('axios');

exports.main = async (functionContext, sendResponse) => {
  // Returns all people from the Star Wars API - https://swapi.dev/documentation#people
  const { data: { results } } = await axios.get('https://swapi.dev/api/people/');

  sendResponse({
    body: {
      character: results[Math.floor(Math.random() * results.length)],
    },
    statusCode: 200
  });
};
