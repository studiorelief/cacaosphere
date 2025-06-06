export function catalogueArianeCatLink() {
  // Get all category links
  const categoryLinks = document.querySelectorAll('.fil-ariane_link');

  // Map of IDs to their corresponding URLs
  const categoryUrlMap: { [key: string]: string } = {
    ingrédients: '/nos-produits?categorie=Ingr%C3%A9dients',
    'couvertures pure origine': '/nos-produits?categorie=Couvertures+pure+origine',
    "chocolats d'atelier": '/nos-produits?categorie=Chocolats+d%27atelier',
    fèves: '/nos-produits?categorie=F%C3%A8ves',
  };

  // Update each category link based on ID
  categoryLinks.forEach((link) => {
    const linkEl = link as HTMLElement;
    const { id } = linkEl;

    if (id && categoryUrlMap[id.toLowerCase()]) {
      linkEl.setAttribute('href', categoryUrlMap[id.toLowerCase()]);
    }
  });
}
