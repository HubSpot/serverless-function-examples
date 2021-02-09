// Axios is available as a default dependency if no package.json is specified
// however, if I specify a package.json file, I must include it if I want to
// use it
const axios = require('axios');
// Customized dependency which is defined in package.json
const dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
const { APIKEY, BOUNTY, MISSION_DAYS, HUBDB_TABLE_NAME } = process.env;
const HUBDB_API = `https://api.hubspot.com/cms/v3/hubdb`;
const rewards = ['Beskar', 'Coaxium', 'Kyber Crystal', BOUNTY];

const getRandomResultsSelection = (data, nestedProp) => {
  const arrayData = nestedProp ? data[nestedProp] : data;

  return arrayData[Math.floor(Math.random() * arrayData.length)];
};

const getRandomReward = () => {
  return rewards[Math.floor(Math.random() * rewards.length)];
};

const getTimeRemaining = mission => {
  const timeLimitValues = mission.timeLimit.split(' ');
  return dayjs(mission.started)
    .add(...timeLimitValues)
    .fromNow(true);
};

const generateNewMission = async () => {
  const { data: planets } = await axios
    .get('http://swapi.dev/api/planets')
    .catch(e => {
      sendResponse({ body: { error: e.message }, statusCode: e.code });
    });
  let resident = {
    name: 'Grogu',
  };

  const planet = getRandomResultsSelection(planets, 'results');
  if (planet.residents.length) {
    const residentUrl = getRandomResultsSelection(planet.residents);
    const residentResp = await axios.get(residentUrl).catch(e => {
      sendResponse({ body: { error: e.message }, statusCode: e.code });
    });
    resident = residentResp.data;
  }
  const terrains = planet.terrain.split(', ');
  const terrain = getRandomResultsSelection(terrains);

  return {
    target: resident.name,
    planet: planet.name,
    area: terrain,
    // dayjs() can be used here because it has been listed within
    // package.json, built using the "hs functions deploy" command, and
    // imported using require('dayjs') at the top of this file
    started: dayjs().format('MM/DD/YYYY hh:mm:ss A'),
    timeLimit: `${MISSION_DAYS} days`,
    reward: getRandomReward(),
  };
};

const checkForExistingMission = async (userId, options) => {
  const missionsResp = await axios.get(
    `${HUBDB_API}/tables/${HUBDB_TABLE_NAME}/rows`,
    { params: options }
  );

  return missionsResp.data.results.find(mission => mission.path === userId);
};

const addNewMission = async (mission, userId, options) => {
  return await axios.post(
    `${HUBDB_API}/tables/${HUBDB_TABLE_NAME}/rows`,
    {
      path: userId,
      name: 'Test',
      isSoftEditable: false,
      values: mission,
    },
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
  const requestOptions = {
    portalId: accountId,
    hapikey: APIKEY,
  };

  const existingMission = await checkForExistingMission(
    contact.vid,
    requestOptions
  );

  if (existingMission) {
    const { values: mission, id } = existingMission;
    return sendResponse({
      body: {
        mission: {
          ...mission,
          id,
          isNew: false,
          timeRemaining: getTimeRemaining(mission),
        },
        contact,
      },
      statusCode: 200,
    });
  } else if (params.createNew === 'true') {
    const newMission = await generateNewMission();

    const newMissionResp = await addNewMission(
      newMission,
      contact.vid,
      requestOptions
    );
    await publishMissions(requestOptions);

    return sendResponse({
      body: {
        mission: {
          ...newMission,
          id: newMissionResp.data.id,
          isNew: true,
          timeRemaining: getTimeRemaining(newMission),
        },
        contact,
      },
      statusCode: 200,
    });
  } else {
    return sendResponse({
      body: {
        mission: null,
        contact,
      },
      statusCode: 200,
    });
  }
};
