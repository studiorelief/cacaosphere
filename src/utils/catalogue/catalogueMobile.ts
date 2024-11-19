/* 
TODO : uniquement sur Mobile le display none(responsive)
*/

export function catalogueOpenFilter() {
  const filterWrapper = document.querySelector('.catalogue_side-filter_wrapper') as HTMLElement;
  const openTrigger = document.querySelector('[trigger="filter-open"]');
  const closeTrigger = document.querySelectorAll('[trigger="filter-close"]');

  if (window.innerWidth < 991) {
    openTrigger?.addEventListener('click', () => {
      if (filterWrapper) {
        filterWrapper.style.display = 'flex';
      }
    });

    closeTrigger.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        if (filterWrapper) {
          filterWrapper.style.display = 'none';
        }
      });
    });
  }
}
