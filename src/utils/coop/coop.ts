/**
 * Filters cooperatives by country and manages their display.
 * If only one cooperative exists for a country, hides the entire section including arrows.
 * If multiple cooperatives exist for a country, shows them all.
 */
export function filterCooperativesByCountry() {
  // Get the source element containing the reference country
  const paysSource = document.querySelector<HTMLElement>('#pays-src');
  if (!paysSource) return;

  // Get the country name from the source element
  const paysReference = paysSource.textContent?.trim();

  // Get all cooperatives
  const coopItems = document.querySelectorAll<HTMLElement>('.coop_origin_same-country');

  // Count cooperatives from the same country
  const coopsFromSameCountry = Array.from(coopItems).filter((item) => {
    const paysCoop = item.getAttribute('data-pays');
    return paysCoop === paysReference;
  });

  // If only one cooperative from the country, hide everything
  if (coopsFromSameCountry.length <= 1) {
    // Hide the dynamic list
    const dynList = document.querySelector<HTMLElement>('.w-dyn-list');
    if (dynList) {
      dynList.style.display = 'none';
    }

    // Hide all arrows
    const arrows = document.querySelectorAll<HTMLElement>('.coop_origin_arrow-wrap');
    arrows.forEach((arrow) => {
      arrow.style.display = 'none';
    });

    return;
  }

  // If multiple cooperatives, show all from the same country
  coopItems.forEach((item) => {
    const paysCoop = item.getAttribute('data-pays');
    const parentItem = item.closest('.w-dyn-item') as HTMLElement;

    if (paysCoop === paysReference) {
      if (parentItem) parentItem.style.display = 'block';
      item.style.display = 'flex';
    } else {
      if (parentItem) parentItem.style.display = 'none';
      item.style.display = 'none';
    }
  });
}

/*export function initCoopFilterLinks() {
  const links = document.querySelectorAll('[data-terroir]');

  links.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      // Récupérer le terroir depuis l'attribut data-terroir
      const terroir = (e.currentTarget as HTMLElement).getAttribute('data-terroir');
      if (!terroir) return;

      // Construire l'URL avec le paramètre de filtre
      // Utiliser encodeURIComponent mais remplacer %20 par + pour l'espace
      const encodedTerroir = encodeURIComponent(terroir).replace(/%20/g, '+');
      const catalogueURL = `/fr/produits?terroirs=${encodedTerroir}`;

      // Rediriger vers la page catalogue
      window.location.href = catalogueURL;
    });
  });
}*/

export function initDynamicCoopLinks() {
  const buttons = document.querySelectorAll('.dynamic-link-coop');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      // Récupérer uniquement le terroir qui contient déjà le pays
      const terroir = (button.getAttribute('data-terroir') || '').trim();

      // Générer le lien avec encodage UTF-8 standard
      const baseUrl = '/fr/nos-produits';
      const params = new URLSearchParams();
      // Utiliser la forme composée (NFC) pour assurer un encodage UTF-8 cohérent
      params.append('terroirs', terroir.normalize('NFC'));

      // Forcer la navigation
      window.location.href = `${baseUrl}?${params.toString()}`;
    });
  });
}
