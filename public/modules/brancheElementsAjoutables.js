import { brancheAjoutItem } from './saisieListeItems.js';

const brancheElementsAjoutables = (
  identifiantConteneurElements, identifiantElement, proprietesElement
) => {
  const indexMax = () => {
    const prefixeIdentifiant = `element-${identifiantElement}`;
    const tousLesIndex = $(`[id^="${prefixeIdentifiant}"]`)
      .map((_, element) => parseInt(
        $(element)
          .attr('id')
          .match(`${prefixeIdentifiant}-([0-9]+)`)[1],
        10
      ));

    return Math.max(...tousLesIndex, -1) + 1;
  };

  const selecteurConteneur = `#${identifiantConteneurElements}`;
  const selecteurLienAjout = `#ajout-element-${identifiantElement}`;

  const templateZoneSaisie = (nomElement, index, proprietes) => {
    const $inputs = Object
      .keys(proprietes)
      .map((cle) => $(
        `<input
          id="${cle}-${nomElement}-${index}"
          name="${cle}-${nomElement}-${index}"
          type="text"
          value="${proprietes[cle].valeur}"
          placeholder="${proprietes[cle].valeurExemple}"
        >`
      ));
    return $(`<div id="element-${nomElement}-${index}"></div>`).append($inputs);
  };

  brancheAjoutItem(
    selecteurLienAjout,
    selecteurConteneur,
    (index) => templateZoneSaisie(identifiantElement, index, proprietesElement),
    () => indexMax()
  );
};

export const brancheElementsAjoutablesDescription = (identifiantConteneurElements, identifiantElement, valeurExemple = '') => (
  brancheElementsAjoutables(
    identifiantConteneurElements,
    identifiantElement,
    {
      description: {
        valeur: '',
        valeurExemple,
      },
    }
  )
);

export default brancheElementsAjoutables;
