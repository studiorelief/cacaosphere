// Catégorie - Statuts
export function catalogueCat() {
  const catalogueCatAll = document.querySelector(
    '.catalogue_top-filter_cat-field.is-all.is-active'
  );
  const catalogueCatFilters = document.querySelectorAll(
    '.catalogue_top-filter_cat-field.is-filter'
  );

  catalogueCatFilters.forEach((filter) => {
    filter.addEventListener('click', () => {
      if (catalogueCatAll) {
        catalogueCatAll.classList.remove('is-active');
      }
    });
  });

  catalogueCatAll?.addEventListener('click', () => {
    catalogueCatAll.classList.add('is-active');
  });

  const catalogueCatAllField = document.querySelector('.catalogue_top-filter_cat-field.is-all');

  // Check if no filter has 'is-active' class
  const checkNoActiveFilter = () => {
    const activeFilters = document.querySelectorAll(
      '.catalogue_top-filter_cat-field.is-filter.is-active'
    );
    if (activeFilters.length === 0 && catalogueCatAllField) {
      catalogueCatAllField.classList.add('is-active');
    }
  };

  // Add event listener to each filter
  catalogueCatFilters.forEach((filter) => {
    filter.addEventListener('click', () => {
      setTimeout(checkNoActiveFilter, 0);
    });
  });

  // Initial check
  checkNoActiveFilter();
}
