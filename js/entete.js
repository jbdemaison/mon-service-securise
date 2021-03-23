var RM = RM || {};

(function (racine) {
  const ajouteEntete = function () {
    const header = document.getElementsByTagName("header")[0];
    header.innerHTML = `
<div class="entete">
  <p>Mon Service Sécurisé – beta</p>
  <p>Développé par l'Agence Nationale de la sécurité des systèmes d'information</p>
</div>
    `;
  };

  racine.ajouteEntete = ajouteEntete;
})(RM);
