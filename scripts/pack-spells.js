// pack the spells from the /spells folder into the ELIZA.project.json file
const fs = require('fs');

function packSpells() {
  const spells = [];

  const spellFiles = fs.readdirSync('./spells');
  spellFiles.forEach(spellFile => {
    const spell = require(`../spells/${spellFile}`);
    spells.push(spell);
  }
  );

  const project = require('../ELIZA.project.json');
  project.spells = spells;

  fs.writeFile('./ELIZA.project.json', JSON.stringify(project, null, 2), err => {
    if (err) throw err;
  }
  );

  console.log('Spells packed!');
}

packSpells();