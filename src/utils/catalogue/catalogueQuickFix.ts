export function fixCatalogueCategoriesText() {
  const categoryElements = document.querySelectorAll('.catalogue_cards_categorie');

  categoryElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      const trimmedText = element.textContent?.trim();
      switch (trimmedText) {
        case 'couvertures pure origine':
          element.textContent = 'couverture pure origine';
          break;
        case "chocolats d'atelier":
          element.textContent = "chocolat d'atelier";
          break;
        case 'fèves':
          element.textContent = 'fève';
          break;
        case 'ingrédients':
          element.textContent = 'ingrédient';
          break;
      }
    }
  });
}

export function hideEmptyLabelsContainer() {
  const labelsContainers = document.querySelectorAll('.catalogue_cards_sec-labels-w');

  labelsContainers.forEach((container) => {
    if (container instanceof HTMLElement) {
      const { children } = container;
      const allChildrenInvisible = Array.from(children).every((child) =>
        child.classList.contains('w-condition-invisible')
      );

      if (allChildrenInvisible) {
        container.style.display = 'none';
      } else {
        container.style.display = ''; // Reset to default display value
      }
    }
  });
}
