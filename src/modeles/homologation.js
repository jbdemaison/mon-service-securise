const Referentiel = require('../referentiel');
const AvisExpertCyber = require('./avisExpertCyber');
const CaracteristiquesComplementaires = require('./caracteristiquesComplementaires');
const Mesure = require('./mesure');
const PartiesPrenantes = require('./partiesPrenantes');
const Risque = require('./risque');

const NIVEAUX = {
  NIVEAU_SECURITE_BON: 'bon',
  NIVEAU_SECURITE_SATISFAISANT: 'satisfaisant',
  NIVEAU_SECURITE_A_RENFORCER: 'aRenforcer',
  NIVEAU_SECURITE_INSUFFISANT: 'insuffisant',
};

class Homologation {
  constructor(donnees, referentiel = Referentiel.creeReferentielVide()) {
    const {
      id = '',
      idUtilisateur,
      nomService,
      natureService = [],
      provenanceService,
      dejaMisEnLigne,
      fonctionnalites,
      donneesCaracterePersonnel,
      delaiAvantImpactCritique,
      presenceResponsable,
      mesures = [],
      caracteristiquesComplementaires = {},
      partiesPrenantes = {},
      risques = [],
      avisExpertCyber = {},
    } = donnees;

    this.id = id;
    this.idUtilisateur = idUtilisateur;
    this.nomService = nomService;
    this.natureService = natureService;
    this.provenanceService = provenanceService;
    this.dejaMisEnLigne = dejaMisEnLigne;
    this.fonctionnalites = fonctionnalites;
    this.donneesCaracterePersonnel = donneesCaracterePersonnel;
    this.delaiAvantImpactCritique = delaiAvantImpactCritique;
    this.presenceResponsable = presenceResponsable;
    this.mesures = mesures.map((donneesMesure) => new Mesure(donneesMesure, referentiel));
    this.caracteristiquesComplementaires = new CaracteristiquesComplementaires(
      caracteristiquesComplementaires, referentiel,
    );
    this.partiesPrenantes = new PartiesPrenantes(partiesPrenantes);
    this.risques = risques.map((donneesRisque) => new Risque(donneesRisque, referentiel));
    this.avisExpertCyber = new AvisExpertCyber(avisExpertCyber, referentiel);

    this.referentiel = referentiel;
  }

  autoriteHomologation() { return this.partiesPrenantes.autoriteHomologation; }

  descriptionAutoriteHomologation() {
    return this.partiesPrenantes.descriptionAutoriteHomologation();
  }

  descriptionEquipePreparation() {
    return this.partiesPrenantes.descriptionEquipePreparation();
  }

  descriptionExpiration() {
    return this.avisExpertCyber.descriptionExpiration();
  }

  descriptionNatureService() { return this.referentiel.natureService(this.natureService); }

  expertCybersecurite() { return this.partiesPrenantes.expertCybersecurite; }

  fonctionAutoriteHomologation() { return this.partiesPrenantes.fonctionAutoriteHomologation; }

  hebergeur() { return this.caracteristiquesComplementaires.descriptionHebergeur(); }

  localisationDonnees() {
    return this.caracteristiquesComplementaires.descriptionLocalisationDonnees();
  }

  nbMesuresMisesEnOeuvreAvecCondition(condition) {
    return this.mesures
      .filter((m) => m.miseEnOeuvre() && condition(m.id))
      .length;
  }

  nbMesuresIndispensablesMisesEnOeuvre() {
    return this.mesures.filter((m) => m.miseEnOeuvre() && m.estIndispensable()).length;
  }

  nbMesuresRecommandeesMisesEnOeuvre() {
    return this.mesures.filter((m) => m.miseEnOeuvre() && m.estRecommandee()).length;
  }

  niveauSecurite() {
    const proportionIndispensables = this.proportionMesuresIndispensablesMisesEnOeuvre();
    const proportionRecommandees = this.proportionMesuresRecommandeesMisesEnOeuvre();

    if (proportionIndispensables === 1) {
      return proportionRecommandees >= 0.5
        ? NIVEAUX.NIVEAU_SECURITE_BON
        : NIVEAUX.NIVEAU_SECURITE_SATISFAISANT;
    }

    if (proportionIndispensables >= 0.75) return NIVEAUX.NIVEAU_SECURITE_A_RENFORCER;

    return NIVEAUX.NIVEAU_SECURITE_INSUFFISANT;
  }

  piloteProjet() { return this.partiesPrenantes.piloteProjet; }

  presentation() { return this.caracteristiquesComplementaires.presentation; }

  proportionMesures(nbMisesEnOeuvre, idsMesures) {
    const identifiantsMesuresNonRetenues = () => this.mesures
      .filter((m) => m.nonRetenue())
      .map((m) => m.id);

    const nbTotalMesuresRetenuesParmi = (identifiantsMesures) => {
      const nonRetenues = identifiantsMesuresNonRetenues();

      return identifiantsMesures
        .filter((id) => !nonRetenues.includes(id))
        .length;
    };

    const nbTotal = nbTotalMesuresRetenuesParmi(idsMesures);
    return nbTotal ? nbMisesEnOeuvre / nbTotal : 1;
  }

  proportionMesuresIndispensablesMisesEnOeuvre() {
    return this.proportionMesures(
      this.nbMesuresIndispensablesMisesEnOeuvre(),
      this.referentiel.identifiantsMesuresIndispensables()
    );
  }

  proportionMesuresRecommandeesMisesEnOeuvre() {
    return this.proportionMesures(
      this.nbMesuresRecommandeesMisesEnOeuvre(),
      this.referentiel.identifiantsMesuresRecommandees()
    );
  }

  structureDeveloppement() { return this.caracteristiquesComplementaires.structureDeveloppement; }

  toJSON() {
    return {
      id: this.id,
      nomService: this.nomService,
    };
  }
}

Object.assign(Homologation, NIVEAUX);

module.exports = Homologation;
