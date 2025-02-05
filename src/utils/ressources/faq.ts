import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function filterFAQCategories() {
  // Sélectionnez l'élément de saisie et les éléments à masquer
  const inputField = document.querySelector<HTMLInputElement>('.header_v3_blog-field');
  const faqCategories = document.querySelectorAll<HTMLElement>('.faq_header-cat');
  const mirrorSearchContent = document.querySelector<HTMLElement>('.faq_mirror-search-content');

  // Fonction pour filtrer les catégories FAQ
  const handleInput = () => {
    if (!inputField || !mirrorSearchContent) return; // Vérifiez si inputField et mirrorSearchContent existent

    const inputValue = inputField.value.trim(); // Récupère la valeur saisie et supprime les espaces autour

    // Si le champ de saisie n'est pas vide, masque les catégories et affiche le contenu
    if (inputValue) {
      faqCategories.forEach((category) => {
        category.style.display = 'none'; // Masque la catégorie
      });

      // Affiche le contenu de recherche avec les styles flex
      mirrorSearchContent.style.display = 'flex'; // Change le display en flex
      mirrorSearchContent.style.flexDirection = 'row'; // Définit la direction de flex en row
      mirrorSearchContent.style.gap = '0.25rem'; // Définit le gap de 0.25rem
    } else {
      // Si le champ de saisie est vide, rétablit l'affichage des catégories et cache le contenu
      faqCategories.forEach((category) => {
        category.style.display = ''; // Réinitialise le style d'affichage
      });

      // Cache le contenu de recherche
      mirrorSearchContent.style.display = 'none'; // Masque le contenu
    }
  };

  // Ajoute un écouteur d'événements sur le champ de saisie
  if (inputField) {
    inputField.addEventListener('input', handleInput);
  }
}

//Transcribe the search bar
export function mirrorFaqSearch() {
  const faqField = document.querySelector<HTMLElement>('#faq-field');
  const searchMirror = document.getElementById('faq_search-mirror');

  if (!faqField || !searchMirror) {
    return;
  }

  // Add event listener for input field
  faqField.addEventListener('input', () => {
    const inputText = (faqField as HTMLInputElement).value; // Retrieve input value
    searchMirror.innerHTML = `&nbsp;${inputText}`; // Add space
  });
}

//See the progress in FAQ Categories
export function linkFaqCategoryAnimations() {
  // Supprimons la gestion du scroll personnalisée et laissons le CSS s'en occuper

  const linksAndTriggers = [
    { link: '#link-cat1', trigger: '#faq-cat1', icon: '.faq_cat-row:nth-child(1) .faq_cat-icon' },
    { link: '#link-cat2', trigger: '#faq-cat2', icon: '.faq_cat-row:nth-child(2) .faq_cat-icon' },
    { link: '#link-cat3', trigger: '#faq-cat3', icon: '.faq_cat-row:nth-child(3) .faq_cat-icon' },
    { link: '#link-cat4', trigger: '#faq-cat4', icon: '.faq_cat-row:nth-child(4) .faq_cat-icon' },
    { link: '#link-cat5', trigger: '#faq-cat5', icon: '.faq_cat-row:nth-child(5) .faq_cat-icon' },
  ];

  linksAndTriggers.forEach(({ link, trigger, icon }) => {
    const linkElement = document.querySelector(link);
    const iconElement = document.querySelector(icon);
    const triggerElement = document.querySelector(trigger);

    if (!linkElement || !iconElement || !triggerElement) return;

    // Initial settings
    gsap.set(iconElement, { opacity: 0 });
    gsap.set(linkElement, { color: 'rgb(90, 31, 27)' });

    // ScrollTrigger animation
    ScrollTrigger.create({
      trigger: triggerElement,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        gsap.to(iconElement, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(linkElement, { color: '#42612d', duration: 0.3, ease: 'power2.out' });
      },
      onLeaveBack: () => {
        gsap.to(iconElement, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        gsap.to(linkElement, { color: 'rgb(90, 31, 27)', duration: 0.3, ease: 'power2.out' });
      },
    });
  });

  // "sticky" for faqLeftCol only for screens larger than 991px
  const faqLeftCol = document.querySelector('.faq_left-col') as HTMLElement | null;

  if (faqLeftCol) {
    const mediaQuery = window.matchMedia('(min-width: 992px)');

    const applyStickyPosition = () => {
      if (mediaQuery.matches) {
        faqLeftCol.style.position = 'sticky';
        faqLeftCol.style.top = '5rem';
      } else {
        faqLeftCol.style.position = '';
        faqLeftCol.style.top = '';
      }
    };

    applyStickyPosition();
    mediaQuery.addEventListener('change', applyStickyPosition);
  }
}

//Hide faq categories empty
export function toggleFaqCategoryVisibility() {
  // Sélectionner les éléments
  const faqCategories = document.querySelectorAll<HTMLElement>('.faq_categorie');

  faqCategories.forEach((category) => {
    // Trouver la liste dans cette catégorie
    const faqList = category.querySelector<HTMLElement>('.faq_category-list.w-dyn-items');

    if (!faqList) return;

    // Fonction pour vérifier si la liste est vide ou cachée
    const checkVisibility = () => {
      // Vérifier le display et si des éléments sont visibles
      const hasVisibleItems = faqList.querySelector('.w-dyn-item');
      const isHidden = faqList.style.display === 'none';

      // Cacher/montrer la catégorie entière
      category.style.display = !hasVisibleItems || isHidden ? 'none' : 'block';
    };

    // Observer les changements dans la liste
    const observer = new MutationObserver(() => {
      setTimeout(checkVisibility, 100); // Petit délai pour laisser Webflow finir ses modifications
    });

    // Observer les changements de style et de contenu
    observer.observe(faqList, {
      childList: true,
      attributes: true,
      subtree: true,
      attributeFilter: ['style'],
    });

    // Vérification initiale
    checkVisibility();
  });
}

export function initFaqScroll() {
  const links = document.querySelectorAll('a[href^="#faq-cat"]');
  const offset = 80 + window.innerHeight * 0.1;

  // Garder une référence de la dernière section modifiée
  let lastModifiedSection: HTMLElement | null = null;

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (!href) return;

      const targetSection = document.querySelector(href) as HTMLElement;
      if (!targetSection) return;

      // Retirer le padding de la section précédente si elle existe
      if (lastModifiedSection && lastModifiedSection !== targetSection) {
        lastModifiedSection.style.paddingTop = '';
      }

      // Appliquer le padding à la nouvelle section cible
      targetSection.style.paddingTop = `${offset}px`;
      lastModifiedSection = targetSection;

      // Scroll vers la section
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
