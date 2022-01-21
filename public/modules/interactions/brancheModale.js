const brancheModale = (selecteurAffichageModale, parentRideau) => {
  $(selecteurAffichageModale).click((eInformation) => {
    eInformation.preventDefault();
    const parent = parentRideau || eInformation.target;

    $('body').css('overflow', 'hidden');
    $('.rideau', $(parent)).css('display', 'flex');

    $('.fermeture-modale', $(parent)).click((eFermeture) => {
      eFermeture.stopPropagation();
      $('.rideau', $(parent)).css('display', '');
      $('body').css('overflow', '');
    });
  });
};

export { brancheModale as default };
