const miseAJour = (contientDonneesCiblees, actionMiseAJour) => (knex) => knex('homologations')
  .then((lignes) => {
    const misesAJour = lignes
      .filter(contientDonneesCiblees)
      .map(({ id, donnees }) => {
        const donneesModifiees = actionMiseAJour(donnees);
        return knex('homologations')
          .where({ id })
          .update({ donnees: donneesModifiees });
      });
    return Promise.all(misesAJour);
  });

const contientCaracteristiquesComplementaires = ({ donnees }) => (
  donnees.caracteristiquesComplementaires
);

const copieDansPartiesPrenantes = (donnees) => {
  donnees.partiesPrenantes ||= {};
  donnees.partiesPrenantes.hebergement = {
    nom: donnees.caracteristiquesComplementaires.hebergeur,
  };
  return donnees;
};

const contientPartiesPrenantes = ({ donnees }) => donnees.partiesPrenantes;

const supprimeDansPartiesPrenantes = (donnees) => {
  delete donnees.partiesPrenantes.hebergement;
  return donnees;
};

exports.up = miseAJour(contientCaracteristiquesComplementaires, copieDansPartiesPrenantes);

exports.down = miseAJour(contientPartiesPrenantes, supprimeDansPartiesPrenantes);
