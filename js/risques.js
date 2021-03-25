var RM = RM || {};

(function (racine) {
  var menacesProbables = [{
    id: 1,
    nom: "Exploitation de vulnérabilités",
    descriptionLongue: "Il s’agit comme son nom l’indique, d’exploiter les vulnérabilités (ou failles) de systèmes ou de logiciels. Bien que les éditeurs de système et de logiciels veillent scrupuleusement à corriger ces failles via des mises à jour correctives fréquentes, il peut arriver qu’elles soient trouvées avant par des personnes malveillantes. Se servant de ces brèches, elles peuvent ainsi infiltrer votre système."
  }, {
    id: 2,
    nom: "Déni de service",
    descriptionLongue: "Une description longue"
  }, {
    id: 3,
    nom: "Vandalisation",
    descriptionLongue: "Une description longue"
  }, {
    id: 4,
    nom: "Ingénierie sociale",
    descriptionLongue: "L'ingénierie sociale regroupe des techniques utilisées par les cybercriminels pour inciter des utilisateurs peu méfiants à leur envoyer leurs données confidentielles, infectant ainsi leurs ordinateurs avec des programmes malveillants ou ouvrant des liens vers des sites infectés"
  }, {
    id: 5,
    nom: "Malwares",
    descriptionLongue: "Une description longue"
  }, {
    id: 6,
    nom: "Hameçonnage",
    descriptionLongue: "L’hameçonnage consiste à envoyer des communications frauduleuses qui semblent provenir d’une source fiable, habituellement par courriel. L’objectif est de voler des données sensibles comme les informations de carte de crédit et de connexion ou d’installer des logiciels malveillants sur l’ordinateur de la victime. L’hameçonnage est une cybermenace de plus en plus courante."
  }, {
    id: 7,
    nom: "Rançongiciels",
    descriptionLongue: "Une description longue"
  }, {
    id: 8,
    nom: "Vol de données",
    descriptionLongue: "Cela arrive lorsque des informations privées sont révélées, volées ou copiées sans permission. Ces incidents de sécurité peuvent être la conséquence d’une cyberattaque de sites web, d’applications ou de n’importe quelle base de données contenant des informations personnelles."
  }];

  const creeConteneurDetailRisqueSelectionne = function (itemCourant, menacesSelectionnees) {
    const details = RM.creeConteneur("details-item");
    details.appendChild(RM.creeConteneur("fleche"));
    const contexteMenace = RM.creeConteneur("contexte-menace");
    details.appendChild(contexteMenace);
    contexteMenace.appendChild(document.createTextNode("Mon contexte"));
    contexteMenace.appendChild(document.createElement("br"));

    const textArea = document.createElement("textarea");
    if (itemCourant.contexte) { textArea.value = itemCourant.contexte; }
    textArea.addEventListener("input", function (e) {
      itemCourant.contexte = e.target.value;
    });
    contexteMenace.appendChild(textArea);

    return details;
  }

  const ajouteConteneurRisquesDansOnglet = function (idConteneur, menacesSelectionnees) {
    RM.ajouteConteneurItemsSelectionnables(
      idConteneur,
      "liste-menaces-probables", "Menaces probables", menacesProbables,
      "liste-menaces-selectionnees", "Menaces sélectionnées", menacesSelectionnees,
      function (itemCourant) { return creeConteneurDetailRisqueSelectionne(itemCourant, menacesSelectionnees) ; }
    );
  };

  racine.ajouteConteneurRisquesDansOnglet = ajouteConteneurRisquesDansOnglet;
})(RM);
