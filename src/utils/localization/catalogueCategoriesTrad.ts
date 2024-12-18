export function catalogueCategoriesTrad() {
  if (window.location.pathname.includes('/en/')) {
    const categoryElements = document.querySelectorAll('[localization=categorie]');
    categoryElements.forEach((element: Element) => {
      const text = element.textContent;

      if (text) {
        switch (text.trim()) {
          case 'couvertures pure origine':
            element.textContent = 'Pure origin covers';
            break;
          case "chocolats d'atelier":
            element.textContent = 'Workshop chocolates';
            break;
          case 'fèves':
            element.textContent = 'Feves';
            break;
          case 'ingrédients':
            element.textContent = 'Ingredients';
            break;
        }
      }
    });
  }
}
