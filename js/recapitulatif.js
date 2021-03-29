var RM = RM || {};

(function (racine) {

  const textePourNatureService = function (natureService) {
    const texteCorrespondant = {
      "Site internet": "un site internet",
      "Application mobile": "une application mobile",
      "API": "une API"
    }

    return texteCorrespondant[natureService] || "un service"
  };

  const textePourFinalite = function (finalite) {
    const texteCorrespondant = {
      "Informer": "d'information",
      "Faire une ou des démarches en ligne": "de démarches en ligne",
      "Mettre en relation (ex. visioconférence, messagerie instantanée, etc.)": "de mise en relation",
    }

    return texteCorrespondant[finalite] || "";
  };

  const textePourPublicVise = function (publicVise) {
    const texteCorrespondant = {
      "Grand public": "du grand public",
      "Entreprises": "des entreprises",
      "Associations": "des associations",
      "Agents publics": "des agents publics",
    }

    return texteCorrespondant[publicVise] || "d'un public non identifié";
  };

  const ajouteConteneurRecapitulatifDansOnglet = function (
    idConteneur, menacesSelectionnees, mesuresSelectionnees
  ) {

    const infosDossier = JSON.parse(window.localStorage.getItem("dossier")) || {};

    const creeConteneurAvantRisques = function () {
      const natureService = textePourNatureService(infosDossier.natureService);
      const finalite = textePourFinalite(infosDossier.finalite);
      const publicVise = textePourPublicVise(infosDossier.publicVise);

      const resume = RM.creeConteneur("section-recapitulatif");
      resume.innerHTML = `
<h1>${infosDossier.nomService}</h1>
<h2>En résumé</h2>
<p>
  <b>${infosDossier.nomService}</b> est <b>${natureService}</b>
  <b>${finalite}</b> à destination ${publicVise}.
</p>

<p>
  <b>${infosDossier.nomService}</b> permettra de Lorem ipsum dolor sit amet,
  consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
  ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
  dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
  officia deserunt mollit anim id est laborum.
</p>

<p>
  <b>${infosDossier.nomService}</b> offrira les fonctionnalités suivantes.
  <ul>
    <li>…</li>
  </ul>
</p>

<h2>L'objectif de l'homologation de sécurité de ${infosDossier.nomService}</h2>
<p>
  Les services numériques (sites internets, applications mobiles, etc.) des
  entités publiques, accessibles au public ou aux agents publics, doivent faire
  l'objet d'une décision d'homologation de sécurité, conformément au
  référentiel général de sécurité, conformément au référentiel général de
  sécurité.
</p>

<p>
  Cette décision conclut une démarche ayant permis d'identifier les principaux
  risques auxquels peut être soumis le service et de lister les mesures de
  sécurité à mettre en œuvre pour le protéger. L'homologation contribue donc au
  renforcement de la sécurité de vos services numériques et diminue ainsi les
  risques associés pour vous et votre organisation.
</p>

<p>
  La décision d'homologation permet de décider du lancement du service. En
  revanche, elle ne signe pas la fin de la prise en compte de la sécurité du
  service qui pourra être renforcée en continu.
</p>

<p>
  La décision d'homologation concourt à la conformité réglementaire de votre
  service vis-à-vis du <br/>
  RGS 2.0 <br/>
  RGPD
</p>

<p>
  La décision d'homologation est prise par l'autorité d'homologation, à savoir
  toute personne disposant de l'autorité suffisante pour permettre le lancement
  du produit.
</p>

<h2>Équipe projet</h2>

<p>
  Le projet ${infosDossier.nomService} est porté par
  <ul>
    <li>
      <b>XXX XXX</b>, responsable technique, qui sera en charge de gérer
      techniquement le service, et
    </li>
    <li>
      <b>YYY YYY</b>, responsable sécurité, qui accompagnera le maintien aux
      conditions de sécurité en continu du service sur le long terme.
    </li>
  </ul>
</p>

<h2>Caractéristiques principales du service</h2>
<p><b>${infosDossier.nomService}</b> a été développé par…</p>
<p><b>${infosDossier.nomService}</b> est hébergé chez… à…</p>
<p>Le service est administré par…</p>
<p>
  Des droits d'accès au service sont donnés aux personnes suivantes.
  <ul>
    <li>…
  </ul>
</p>
<p>
  Quelques caractéristiques additionnelles : <br/>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>

      `;
      return resume;
    };

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

    const creeConteneurRecapitulatifRisques = function () {
      const recapitulatifRisques = RM.creeConteneur("liste-items", "Les principaux risques identifiés");
      const h3 = document.createElement("h3");
      h3.appendChild(document.createTextNode("Ces risques sont présentés de manière synthétique en annexe"));
      recapitulatifRisques.appendChild(h3);

      menacesSelectionnees.forEach(function (menace) {
        const risque = RM.creeConteneur("item");
        risque.appendChild(document.createTextNode(menace.nom));
        recapitulatifRisques.appendChild(risque);
      });

      return recapitulatifRisques;
    };

    const creeConteneurRecapitulatifMesures = function () {
      const recapitulatifMesures = RM.creeConteneur(
        "liste-items", "Les principales mesures de sécurité identifiées");
      const h3 = document.createElement("h3");
      h3.appendChild(document.createTextNode("Ces mesures sont présentées et détaillées en annexe"));
      recapitulatifMesures.appendChild(h3);

      mesuresSelectionnees.forEach(function (mesure) {
        const divMesure = RM.creeConteneur("item");

        const spanNomMesure = document.createElement("span");
        spanNomMesure.classList.add("nom-mesure");
        spanNomMesure.appendChild(document.createTextNode(mesure.nom));
        divMesure.appendChild(spanNomMesure);

        const spanApplicationMesure = document.createElement("span");
        spanApplicationMesure.classList.add("application-mesure");
        const texteApplicationMesure = mesure.applicationMesure ? "Mesure appliquée" : "Mesure à traiter";
        spanApplicationMesure.appendChild(document.createTextNode(texteApplicationMesure));
        divMesure.appendChild(spanApplicationMesure);

        recapitulatifMesures.appendChild(divMesure);
      });

      return recapitulatifMesures;
    };

    const metsAJourRecapitulatif = function (e) {
      const conteneur = e.target;
      const recapitulatif = RM.creeConteneur("recapitulatif");

      conteneur.innerHTML = "";
      conteneur.appendChild(recapitulatif);

      recapitulatif.appendChild(creeConteneurAvantRisques());
      recapitulatif.appendChild(creeConteneurRecapitulatifRisques());
      recapitulatif.appendChild(creeConteneurRecapitulatifMesures());
    };

    const conteneur = document.getElementById(idConteneur);
    conteneur.addEventListener("renduVisible", metsAJourRecapitulatif);
  };

  RM.ajouteConteneurRecapitulatifDansOnglet = ajouteConteneurRecapitulatifDansOnglet;
})(RM);
