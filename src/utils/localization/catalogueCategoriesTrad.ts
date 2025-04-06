export function catalogueCategoriesTrad() {
  const translateCategories = () => {
    if (window.location.pathname.includes('/en/')) {
      const categoryElements = document.querySelectorAll('[localization=categorie]');
      categoryElements.forEach((element: Element) => {
        const text = element.textContent;

        if (text) {
          switch (text.trim()) {
            case 'couvertures pure origine':
              element.textContent = 'Pure Couverture chocolates';
              break;
            case "chocolats d'atelier":
              element.textContent = 'Workshop chocolates';
              break;
            case 'fèves':
              element.textContent = 'Cocoa Beans';
              break;
            case 'FEVES':
              element.textContent = 'Cocoa Beans';
              break;
            case 'ingrédients':
              element.textContent = 'Key Ingredients';
              break;
          }
        }
      });
    }
  };

  // Initial translation
  translateCategories();

  // Listen for URL changes
  const observer = new MutationObserver(() => {
    translateCategories();
  });

  // Observe changes to the URL
  observer.observe(document.querySelector('body')!, {
    childList: true,
    subtree: true,
  });
}
