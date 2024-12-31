export function filterCooperativesByCountry() {
  const paysSource = document.querySelector<HTMLElement>('#pays-src');
  if (!paysSource) return;

  const paysReference = paysSource.textContent?.trim();
  const coopItems = document.querySelectorAll<HTMLElement>('.coop_origin_same-country');

  const dynList = document.querySelector<HTMLElement>('.w-dyn-list');
  if (dynList) {
    dynList.style.display = 'block';
  }

  coopItems.forEach((item) => {
    const paysCoop = item.getAttribute('data-pays');

    if (paysCoop === paysReference) {
      const parentItem = item.closest('.w-dyn-item') as HTMLElement;
      if (parentItem) {
        parentItem.style.display = 'block';
      }
      item.style.display = 'flex';
    } else {
      const parentItem = item.closest('.w-dyn-item') as HTMLElement;
      if (parentItem) {
        parentItem.style.display = 'none';
      }
      item.style.display = 'none';
    }
  });
}
