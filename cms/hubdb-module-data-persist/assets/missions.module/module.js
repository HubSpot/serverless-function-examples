const newMissionButton = document.getElementById('new-mission');
const completeMissionButton = document.getElementById('complete-mission');
const errorMessage = document.getElementById('error-message');
const missionText = document.getElementById('mission-text');
const rewardText = document.getElementById('reward-text');

// This should be `/_hcms/api` for non-local functions
const serverlessFunctionBasePath = '/_hcms/api';
// This should be `same-origin` for non-local functions
const fetchMode = 'same-origin';
let missionData = {};

const displayError = error => {
  errorMessage.textContent = error;
  setTimeout(() => {
    if (errorMessage.textContent === error) {
      errorMessage.textContent = '';
    }
  }, 7500);
};

const getMissionText = mission => {
  return `Your mission is to find ${mission.target} in the ${mission.area} of ${mission.planet}. You started this mission on ${mission.started} and have ${mission.timeRemaining} to complete this mission and claim your ${mission.reward}.`;
};

const getMission = async e => {
  const missionResp = await fetch(
    `${serverlessFunctionBasePath}/mission?createNew=${!!e}`,
    {
      method: 'GET',
      mode: fetchMode,
      cache: 'no-cache',
    }
  );
  const respText = await missionResp.text();
  missionData = respText === '' ? {} : JSON.parse(respText);

  if (missionData.mission) {
    missionText.textContent = getMissionText(missionData.mission);
    newMissionButton.style.display = 'none';
    completeMissionButton.style.display = 'inline-block';
    rewardText.style.display = 'none';
  }
};

const completeMission = async e => {
  const completionResp = await fetch(`${serverlessFunctionBasePath}/complete`, {
    method: 'POST',
    mode: fetchMode,
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(missionData),
  });
  const respText = await completionResp.text();
  const completionData = respText === '' ? {} : JSON.parse(respText);

  missionText.textContent = '';
  completeMissionButton.style.display = 'none';
  newMissionButton.style.display = 'inline-block';
  rewardText.textContent = `Congratulations Mando! They're all weighing the ${completionData.mission.reward} in their minds, but not me. No. I, for one, I celebrate your success. Because it is my success, as well. Hell! Even I am rich.`;
  rewardText.style.display = 'block';
};

newMissionButton.addEventListener('click', getMission);
completeMissionButton.addEventListener('click', completeMission);
getMission();
