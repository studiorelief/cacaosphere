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

export function catalogueCalcFilterNumber() {
  // Get all category numbers from side filter
  const sideFilterNumbers = document.querySelectorAll('.catalogue_side-filter_cat-number');
  const topFilterAllNumber = document.querySelector('.catalogue_top-filter_all-number');

  if (!topFilterAllNumber) return;

  // Calculate total
  const total = Array.from(sideFilterNumbers).reduce((sum, element) => {
    const number = parseInt(element.textContent || '0', 10);
    return sum + number;
  }, 0);

  // Update total in top filter and handle display
  topFilterAllNumber.textContent = total.toString();

  if (total === 0) {
    (topFilterAllNumber as HTMLElement).style.display = 'none';
  } else {
    (topFilterAllNumber as HTMLElement).style.display = 'inline-block';
  }
}

// Add event listener for filter changes
document.addEventListener('change', (event) => {
  const target = event.target as Element;
  if (target && target.closest('.catalogue_side-filter_accordion-item')) {
    setTimeout(() => {
      catalogueCalcFilterNumber();
    }, 100); // Small delay to ensure counts are updated
  }
});
