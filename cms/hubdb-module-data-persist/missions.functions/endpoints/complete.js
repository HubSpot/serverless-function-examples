const axios = require('axios');

const { APIKEY, HUBDB_TABLE_NAME } = process.env;
const HUBDB_API = `https://api.hubspot.com/cms/v3/hubdb`;

const deleteMission = async (id, options) => {
  return await axios.delete(
    `${HUBDB_API}/tables/${HUBDB_TABLE_NAME}/rows/${id}/draft`,
    { params: options }
  );
};

const publishMissions = async options => {
  return await axios.post(
    `${HUBDB_API}/tables/${HUBDB_TABLE_NAME}/draft/push-live`,
    {},
    { params: options }
  );
};

exports.main = async (
  { params, limits, body, headers, contact, accountId },
  sendResponse
) => {
  const {
    mission: { id },
  } = body;
  const requestOptions = {
    portalId: accountId,
    hapikey: APIKEY,
  };

  await deleteMission(id, requestOptions);
  await publishMissions(requestOptions);

  sendResponse({
    body,
    statusCode: 200,
  });
};
