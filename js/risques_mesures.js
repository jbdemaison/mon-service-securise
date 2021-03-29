var RM = RM || {};

(function (racine) {
  const identifiantPage = function () {
    const main = document.getElementsByTagName("main")[0];
    return main.id;
  };

  const creePageAccueil = function () {
    const main = document.getElementsByTagName("main")[0];
    main.innerHTML = `
  <div class="intro">
    <h1>
      <div class="texte-bleu">Homologuer mon service</div>
      <div class="texte-rouge">et suivre la sécurité en continu</div>
    </h1>
    <p>
      Un outil simple et rapide pour aider à la protection et à l'homologation
      RGS de mon service numérique
    </p>

    <a class="bouton" href="/demarrage_saisie.html">Démarrer mon homologation ></a>
  </div>

  <div class="informations-complementaires bandeau-bleu">
    <h2>Comment ça marche ?</h2>
    <ul class="etape-comment-ca-marche">
      <li>Identifiez les risques et les mesures de sécurité</li>
      <li>Générez l'homologation de sécurité RGS</li>
      <li>Suivez la sécurité de votre service en continu</li>
    </ul>
  </div>

  <div class="informations-complementaires">
    <h2>Assurez la sécurité de votre service avec votre équipe au fil de l'eau</h2>
    <div class="apercu"></div>
  </div>
    `;
  };

  const creePageDemarrageSaisie = function () {
    const main = document.getElementsByTagName("main")[0];
    const etapes = [{
      titre: "À propos de vous",
      callbackCreationElements: RM.creeQuestionsBeneficiaire
    }, {
      titre: "À propos de votre service",
      callbackCreationElements: RM.creeQuestionsService
    }];
    main.appendChild(RM.creeConteneurQuestionnaire(etapes));
  };

  const demarre = function () {
    const menacesSelectionnees = [];
    const mesuresSelectionnees = [];

    RM.ajouteEntete();

    const idPage = identifiantPage();
    if (idPage === "page-accueil") { creePageAccueil(); }
    if (idPage === "page-demarrage-saisie") { creePageDemarrageSaisie(); }

    if (idPage === "") {
      RM.creeOnglets([
        { id: "risques", titre: "J'évalue les risques" },
        { id: "mesures", titre: "Je me protège" },
        { id: "recapitulatif", titre: "Synthèse" }
      ]);

      RM.ajouteConteneurRisquesDansOnglet("risques", menacesSelectionnees);
      RM.ajouteConteneurMesuresDansOnglet("mesures", menacesSelectionnees, mesuresSelectionnees);
      RM.ajouteConteneurRecapitulatifDansOnglet("recapitulatif", menacesSelectionnees, mesuresSelectionnees);
      RM.selectionneOnglet("risques");
    }

    RM.ajoutePiedPage();
  };

  racine.demarre = demarre;
})(RM);
