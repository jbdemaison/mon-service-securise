const $modaleNouveauContributeur = () => {
  const $element = $(`
<div class="rideau">
  <div class="modale">
    <div class="fermeture-modale"></div>
    <div class="contenu-modale">
      <h1>Ajout de contributeurs</h1>
      <label for="emailContributeur">Inviter un nouveau contributeur</label>
      <div class="nouveau-contributeur">
        <div class="icone-enveloppe"></div>
        <input id="emailContributeur"
               name="emailContributeur"
               placeholder="ex. jean.dupont@mail.fr">
        <input id="idHomologation" name="idHomologation" type="hidden">
      </div>
      <div class="confirmation">
        <a class="bouton" id="nouveau-contributeur">Envoyer</a>
      </div>
    </div>
  </div>
</div>
  `);

  return $element;
};

const $homologationExistante = (donneesHomologation, classeNouveauContributeur) => {
  const $element = $(`
<a class="homologation existante" href="/homologation/${donneesHomologation.id}">
  <div class="titre-homologation">${donneesHomologation.nomService}</div>
  <div class="contributeurs">
    <p>Contributeurs</p>
    <div class="pastilles-contributeurs">
      <div class="${classeNouveauContributeur}" data-id-homologation="${donneesHomologation.id}"></div>
    </div>
  </div>
</a>
  `);

  return $element;
};

const $ajoutNouvelleHomologation = () => $(`
<a class="nouvelle homologation" href="/homologation/creation">
  <div class="icone-ajout"></div>
  <div>Créer un nouveau projet d'homologation</div>
</a>
`);

const $homologations = (donneesHomologations, classeNouveauContributeur) => donneesHomologations
  .reduce(($acc, donneesHomologation) => {
    const $homologation = $homologationExistante(donneesHomologation, classeNouveauContributeur);
    return $acc.append($homologation);
  }, $(document.createDocumentFragment()))
  .append($ajoutNouvelleHomologation());

export { $homologations, $modaleNouveauContributeur };
