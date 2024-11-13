// Hide empty in top - product page
export function hideEmptyWrapper() {
  // produit - top
  const wrappers = ['.produit_hero_matiere', '.produit_hero_feve', '.produit_hero_couverture'];

  wrappers.forEach((wrapper) => {
    const element = document.querySelector(wrapper);

    if (element instanceof HTMLElement) {
      const { children } = element;

      const allChildrenHidden = Array.from(children).every((child) => {
        if (child instanceof HTMLElement) {
          const computedStyle = window.getComputedStyle(child);
          return computedStyle.display === 'none' || child.offsetHeight === 0;
        }
        return false;
      });

      if (allChildrenHidden || element.offsetHeight === 0) {
        element.style.display = 'none';
      }
    }
  });
}
