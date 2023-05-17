// unpacks spells from the .project.json into the spells folder

const fs = require('fs');
function unpackSpells() {
  const spells = require('../ELIZA.project.json').spells;
  spells.forEach(spell => {
    // format the json file
    fs.writeFile(`./spells/${spell.name}.json`, JSON.stringify(spell
        , null, 2
        ), err => {
      if (err) throw err;
    });
  });
}

unpackSpells();