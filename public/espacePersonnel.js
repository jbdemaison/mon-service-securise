import { $homologations, $modaleNouveauContributeur } from './modules/elementsDom/homologations.js';
import brancheModale from './modules/interactions/brancheModale.js';

$(() => {
  const peupleHomologationsDans = (placeholder, donneesHomologations) => {
    const $conteneurHomologations = $(placeholder);
    const $conteneursHomologation = $homologations(donneesHomologations, 'ajout-contributeur');

    $conteneurHomologations.prepend($conteneursHomologation);

    $('body').append($modaleNouveauContributeur());
    brancheModale('.ajout-contributeur', 'body');
  };

  axios.get('/api/homologations')
    .then((reponse) => peupleHomologationsDans('.homologations', reponse.data.homologations));
});
