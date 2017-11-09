const listOfPlays = require('./data/toc.json')

/*
  each play should look like:
  {
    overview: ...,
    act_1: {
      scene_1: [...], // array of line objects
      scene_2: [...]
    },
    act_2: ...,
    act_3: ...,
    act_4: ...,
    act_5: ...,
    complete: ...
  }
*/

const allPlays = {};

function makePlayObject (playName) {
  const playObj = {};
  const basePath = `./data/plays/${playName}`

  const overview = require(`${basePath}/${playName}_overview.json`);
  playObj.overview = overview;
  
  const complete = require(`${basePath}/${playName}_complete.json`);
  playObj.complete = complete;

  [1, 2, 3, 4, 5].forEach(actNum => {
    const sceneNums = overview.acts[actNum];
    playObj[`act_${actNum}`] = {};

    sceneNums.forEach(sceneNum => {
      try {
        playObj[`act_${actNum}`][`scene_${sceneNum}`] = require(`${basePath}/act_${actNum}/scene_${sceneNum}.json`);
      } catch(err) {
        console.log("Something went wrong:", err);
      }
    });
  })

  return playObj;
};

makePlayObject('Macbeth');

listOfPlays.forEach(playName => {
  const playObj = makePlayObject(playName);

  allPlays[playName] = playObj;
});

module.exports = allPlays;