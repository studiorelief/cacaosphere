export function updateCatalogueCount() {
  const accordionItems = document.querySelectorAll('.catalogue_side-filter_accordion-item');

  accordionItems.forEach((item) => {
    const checkedInputs = item.querySelectorAll('.w--redirected-checked');
    const countElement = item.querySelector('.catalogue_side-filter_cat-number');

    if (countElement) {
      // Ensure the count is visible even if it's zero
      countElement.textContent = checkedInputs.length.toString();
      if (parseInt(countElement.textContent || '0') > 0) {
        (countElement as HTMLElement).style.display = 'flex';
      } else {
        (countElement as HTMLElement).style.display = 'none';
      }
    }
  });
}

// Call the function initially and set up a MutationObserver to watch for changes
document.addEventListener('DOMContentLoaded', () => {
  updateCatalogueCount();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        updateCatalogueCount();
      }
    });
  });

  const config = { attributes: true, attributeFilter: ['class'], subtree: true };

  document.querySelectorAll('.catalogue_side-filter_accordion-item').forEach((item) => {
    observer.observe(item, config);
  });
});

// Add event listeners for checkbox changes
document.addEventListener('change', (event) => {
  const target = event.target as Element;
  if (target && target.closest('.catalogue_side-filter_accordion-item')) {
    updateCatalogueCount();
  }
});

export function catalogueFilterCount() {
  // Function to count and update for a specific attribute
  function countAndUpdate(attribute: string) {
    const collectionList = document.querySelector('.catalogue_content_collection-list.is-filter');
    if (!collectionList) return;

    const labelElements = document.querySelectorAll(`[filter-count-label="${attribute}"]`);

    labelElements.forEach((labelElement) => {
      const labelText = labelElement.textContent?.trim();

      if (labelText) {
        const elements = collectionList.querySelectorAll(`[filter-count="${attribute}"]`);

        let count = 0;
        elements.forEach((element) => {
          if (element.textContent && element.textContent.trim() === labelText) {
            // si erreur dans le count check ici
            count += 1;
          }
        });

        const siblingNumberElement = labelElement.parentElement?.querySelector(
          `[filter-count-number="${attribute}"]`
        );
        if (siblingNumberElement) {
          siblingNumberElement.textContent = count.toString();
        }
      }
    });
  }

  countAndUpdate('terroirs');
  countAndUpdate('varietes');
  countAndUpdate('applications');
  countAndUpdate('profils');
  countAndUpdate('labels');
  countAndUpdate('commerce-e');
  countAndUpdate('agro-e');
  countAndUpdate('transfo');
}
