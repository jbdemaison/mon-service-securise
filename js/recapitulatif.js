var RM = RM || {};

(function (racine) {
  const ajouteConteneurRecapitulatifDansOnglet = function (
    idConteneur, menacesSelectionnees, mesuresSelectionnees
  ) {

    const ajouteRubrique = function (titre, conteneur, risqueAConserver, mesureAAssocier)  {
      const items = RM.creeConteneur("items-recapitulatif", titre);
      conteneur.appendChild(items);

      const grille = RM.creeConteneur("grille-items-recapitulatif");
      items.appendChild(grille);

      const risques = new Map();
      menacesSelectionnees.forEach(function (menace) {
        const mesuresAssociees = mesuresSelectionnees.filter(function (m) { return mesureAAssocier(menace, m); });
        risques.set(menace, mesuresAssociees);
      });

      risques.forEach(function (mesures, risque) {
        if (!risqueAConserver(risque, mesures)) risques.delete(risque);
      })
      risques.forEach(function (mesures, risque) {
        console.log(mesures);
        const divRisque = RM.creeConteneur("risque");
        divRisque.appendChild(document.createTextNode(risque.nom));
        grille.appendChild(divRisque);

        const divMesures = RM.creeConteneur("mesures-associees");
        mesures.forEach(function (mesure) {
          const divMesure = RM.creeConteneur("mesure-associee");
          divMesure.appendChild(document.createTextNode(mesure.nom));
          divMesures.appendChild(divMesure);
        });
        grille.appendChild(divMesures);
      });


      return grille;
    };

    const metsAJourRecapitulatif = function (e) {
      const conteneur = e.target;
      conteneur.innerHTML = "";

      ajouteRubrique("Risques identifiés et traités", conteneur,
        function (_, mesures) { return mesures.length > 0 && mesures[0].applicationMesure; },
        function (risque, mesure) { return mesure.risquesConcernes.includes(risque.id) && mesure.applicationMesure; }
      );

      ajouteRubrique("Risques identifiés et à traiter", conteneur,
        function (_, mesures) { return mesures.length > 0 && !mesures[0].applicationMesure; },
        function (risque, mesure) { return mesure.risquesConcernes.includes(risque.id) && !mesure.applicationMesure; }
      );

      ajouteRubrique("Risques résiduels", conteneur,
        function (_, mesures) { return mesures.length === 0; },
        function (risque, mesure) { return mesure.risquesConcernes.includes(risque.id); }
      );
    };

    const conteneur = document.getElementById(idConteneur);
    conteneur.addEventListener("renduVisible", metsAJourRecapitulatif);
  };

  RM.ajouteConteneurRecapitulatifDansOnglet = ajouteConteneurRecapitulatifDansOnglet;
})(RM);
