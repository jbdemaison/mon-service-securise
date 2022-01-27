const expect = require('expect.js');

const PartiesPrenantes = require('../../../src/modeles/partiesPrenantes/partiesPrenantes');
const InformationsHomologation = require('../../../src/modeles/informationsHomologation');

const elles = it;

describe('Les parties prenantes', () => {
  elles('se construisent avec un hébérgement', () => {
    const partiesPrenantes = new PartiesPrenantes(
      { partiesPrenantes: { hebergement: {} } }
    );

    expect(partiesPrenantes.hebergement).to.be.ok();
  });

  elles("sont saisies quand l'hébergement l'est", () => {
    const partiesPrenantes = new PartiesPrenantes(
      { partiesPrenantes: { hebergement: { nom: 'hébergeur' } } }
    );

    expect(partiesPrenantes.statutSaisie()).to.equal(InformationsHomologation.COMPLETES);
  });

  elles('savent se décrire en json', () => {
    const partiesPrenantes = new PartiesPrenantes(
      { partiesPrenantes: { hebergement: { nom: 'hébergeur' } } }
    );

    expect(partiesPrenantes.toJSON()).to.eql({ hebergement: { nom: 'hébergeur' } });
  });
});
