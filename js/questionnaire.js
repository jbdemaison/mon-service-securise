var RM = RM || {};

(function (racine) {
  var infosDossier = {};

  const persisteInfosDossier = function () {
    window.localStorage.setItem("dossier", JSON.stringify(infosDossier));
  };

  const selecteur = function (typeInput, prefixeIdInput, options, callbackSelection) {
    const div = RM.creeConteneur(prefixeIdInput);
    options.forEach(function (option, index) {
      const idInput = prefixeIdInput + "-" + index;
      const input = document.createElement("input");
      input.id = idInput;
      input.type = typeInput;
      input.name = prefixeIdInput;
      input.value = option;
      input.addEventListener("change", callbackSelection);
      div.appendChild(input);

      const label = document.createElement("label");
      label.htmlFor = idInput;
      label.appendChild(document.createTextNode(option));
      div.appendChild(label);
      div.appendChild(document.createElement("br"));
    });

    return div;
  }

  const casesACocher = function (prefixeIdInput, options, callbackSelection) {
    return selecteur("checkbox", prefixeIdInput, options, callbackSelection);
  };

  const boutonsRadio = function (prefixeIdInput, options) {
    return selecteur("radio", prefixeIdInput, options);
  };

  const boiteSelection = function (idSelect, options) {
    const select = document.createElement("select");
    select.id = idSelect;
    options.forEach(function (libelle) {
      const option = document.createElement("option");
      option.value = libelle;
      option.appendChild(document.createTextNode(libelle));
      select.appendChild(option);
    });
    return select;
  }

  const creeQuestion = function (question) {
    const divQuestion = RM.creeConteneur("question", question.titre);
    divQuestion.appendChild(question.callbackCreationElements());

    return divQuestion;
  };

  const creeQuestions = function (questions) {
    const fieldset = document.createElement("fieldset");

    questions.forEach(function (question) {
      fieldset.appendChild(creeQuestion(question));
    });

    return fieldset;
  };

  const creeQuestionsBeneficiaire = function () {
    const divQuestions = RM.creeConteneur("questions");

    questions = [{
      titre: "Vous travaillez pour",
      callbackCreationElements: function () {
        return casesACocher("type-beneficiaire", [
          "Une administration centrale",
          "Un établissement public",
          "Une collectivité, un syndicat mixte, une intercommunalité",
          "Autre"
        ]);
      }
    }]

    divQuestions.appendChild(creeQuestions(questions));

    return divQuestions;
  };

  const creeQuestionsService = function () {
    const divQuestions = RM.creeConteneur("questions");

    const questionsService = [{
      titre: "Appellation du service",
      callbackCreationElements: function () {
        const input = document.createElement("input");
        input.id = "nom-service";
        input.type = "text";

        input.addEventListener("change", function (e) {
          infosDossier.nomService = e.target.value;
        });

        return input;
      }
    }, {
      titre: "Nature de votre service",
      callbackCreationElements: function () {
        return casesACocher("nature-service", [
          "Site internet",
          "Application mobile",
          "API",
          "Autre"
        ], function (e) {
          infosDossier.natureService = e.target.value;
        });
      }
    }, {
      titre: "Finalité du service",
      callbackCreationElements: function () {
        return casesACocher("finalite-service", [
          "Informer",
          "Faire une ou des démarches en ligne",
          "Mettre en relation (ex. visioconférence, messagerie instantanée, etc.)",
          "Autre"
        ], function (e) {
          infosDossier.finalite = e.target.value;
        });
      }
    }];

    const questionsUtilisateurs = [{
      titre: "Utilisateurs",
      callbackCreationElements: function () {
        return casesACocher("utilisateur", [
          "Grand public",
          "Entreprises",
          "Associations",
          "Agents publics",
          "Autre"
        ], function (e) {
          infosDossier.publicVise = e.target.value;
        });
      }
    }, {
      titre: "Type d'utilisateurs",
      callbackCreationElements: function () {
        return casesACocher("type-utilisateur", [
          "Visiteurs sans compte",
          "Visiteurs avec compte",
          "Administrateurs",
          "Autre"
        ]);
      }
    }, {
      titre: "À terme, combien d'utilisateurs pourraient utiliser votre service ?",
      callbackCreationElements: function () {
        return boiteSelection("nombre-utilisateurs", [
          "Moins de quelques centaines",
          "Plus que ça"
        ]);
      }
    }]

    const questionsAvancement = [{
      titre: "Avancement du service",
      callbackCreationElements: function () {
        return boutonsRadio("avancement-service", [
          "Le service n'est pas encore développé",
          "Le service est en cours de développement",
          "Le service est en ligne"
        ]);
      }
    }];

    [questionsService, questionsUtilisateurs, questionsAvancement].forEach(function (questions) {
      divQuestions.appendChild(creeQuestions(questions));
    });

    return divQuestions;
  };

  const creeConteneurQuestionnaire = function (etapes) {
    const questionnaire = RM.creeConteneur("questionnaire");
    questionnaire.innerHTML = `
<div class="entete">
  <div class="titre">
    <h2>Créer un nouveau dossier d'homologation</h2>
    <h3>
      Pour nous aider à vous faire des suggestions, nous avons besoin d'en
      savoir un peu plus sur vous et votre projet.
    </h3>
  </div>
  <a href="/saisie.html">Passer cette étape</a>
</div>
    `;

    etapes.forEach(function (etape, index) {
      const divEtape = RM.creeConteneur("etape");
      divEtape.id = "etape-" + (index + 1);
      if (index > 0) divEtape.classList.add("invisible");

      const titre = RM.creeConteneur("titre-etape", `Étape ${index + 1} sur ${etapes.length} : ${etape.titre}`);

      const pied = RM.creeConteneur("pied");

      const a = document.createElement("a");
      a.classList.add("bouton");
      a.appendChild(document.createTextNode("Continuer"));
      if (index === etapes.length - 1) {
        a.href = "/saisie.html";
        a.addEventListener("click", persisteInfosDossier);
      } else {
        a.href = "#";
        a.addEventListener("click", function (e) {
          persisteInfosDossier();
          document.querySelector(`#etape-${index + 1}`).classList.add("invisible");
          document.querySelector(`#etape-${index + 2}`).classList.remove("invisible");
        });
      }

      questionnaire.appendChild(divEtape);
      divEtape.appendChild(titre);
      divEtape.appendChild(etape.callbackCreationElements());
      divEtape.appendChild(pied);
      pied.appendChild(a);
    });

    return questionnaire;
  };

  racine.creeConteneurQuestionnaire = creeConteneurQuestionnaire;
  racine.creeQuestionsBeneficiaire = creeQuestionsBeneficiaire;
  racine.creeQuestionsService = creeQuestionsService;
})(RM);
