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

export function initCoopFilterLinks() {
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
}

export function initDynamicCoopLinks() {
  const buttons = document.querySelectorAll('.dynamic-link-coop');

  buttons.forEach((button) => {
    // Récupérer et nettoyer les données des attributs
    const country = (button.getAttribute('data-country') || '').trim();
    let terroir = (button.getAttribute('data-terroir') || '').trim();

    // Supprimer le nom du pays au début de la coopérative s'il est répété
    if (terroir.startsWith(country)) {
      terroir = terroir.replace(country, '').trim();
    }

    // Générer le lien
    const baseUrl = '/fr/catalogue'; // Modifié pour correspondre à votre structure
    const formattedLink = `${baseUrl}?terroirs=${encodeURIComponent(country)}+${encodeURIComponent(terroir)}`;

    // Assigner le lien au bouton
    (button as HTMLAnchorElement).href = formattedLink;
  });
}
