const InformationsHomologation = require('../informationsHomologation');
const PartiePrenante = require('./partiePrenante');

class PartiesPrenantes extends InformationsHomologation {
  constructor({ partiesPrenantes = {} }) {
    super();
    this.hebergement = new PartiePrenante(partiesPrenantes.hebergement);
  }

  statutSaisie() {
    return this.hebergement.statutSaisie();
  }

  toJSON() {
    return { hebergement: this.hebergement.toJSON() };
  }
}

module.exports = PartiesPrenantes;
