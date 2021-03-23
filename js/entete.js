var RM = RM || {};

(function (racine) {
  const ajouteEntete = function () {
    const header = document.getElementsByTagName("header")[0];
    header.innerHTML = `
<h1>
  <span class="texte-bleu">Mon Service</span>
  <span class="texte-rouge">Sécurisé</span>
  <span class="beta">beta</span>
</h1>
<p>Développé par l'Agence Nationale de la sécurité des systèmes d'information</p>
    `;
  };

  racine.ajouteEntete = ajouteEntete;
})(RM);
