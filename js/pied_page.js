var RM = RM || {};

(function (racine) {
  const ajoutePiedPage = function () {
    const footer = document.getElementsByTagName("footer")[0];
    footer.innerHTML = `
<div>Mon service sécurisé par l'ANSSI – version beta</div>
    `;
  };

  racine.ajoutePiedPage = ajoutePiedPage;
})(RM);

