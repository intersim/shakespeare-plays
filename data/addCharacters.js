const fs = require('fs');
const Bluebird = require('bluebird');
const listOfPlays = require('./toc.json');

const readFile = Bluebird.promisify(fs.readFile);
const writeFile = Bluebird.promisify(fs.writeFile);

function addCharactersToOverview (playName) {
  let characters, overview;
  readFile(`${__dirname}/characters/${playName}-characters.json`)
  .then(_characters => {
    characters = JSON.parse(_characters);
    return readFile(`${__dirname}/plays/${playName}/${playName}_overview.json`)
  })
  .then(_overview => {
    overview = JSON.parse(_overview.toString());
    overview.characters = characters;
    return writeFile(`${__dirname}/plays/${playName}/${playName}_overview.json`, overview);
  })
  .then(() => console.log(`Successfully updated overview of ${playName}`))
  .catch(console.error)
}

addCharactersToOverview('Macbeth');

// listOfPlays.forEach(play => {
//   addCharactersToOverview(play);
// });
