import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

//Transcribe the search bar
export function mirrorFaqSearch() {
  const faqField = document.querySelector<HTMLElement>('#blog-field');
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

export function initFaqScroll() {
  const links = document.querySelectorAll('a[href^="#faq-cat"]');
  const offset = 20 + window.innerHeight * 0.1;

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

export function checkAndHideEmptyCategories() {
  // Sélectionnez tous les éléments .faq_categorie
  const faqCategories = document.querySelectorAll<HTMLElement>('.faq_categorie');

  faqCategories.forEach((category) => {
    // Trouver la liste dans cette catégorie
    const faqList = category.querySelector<HTMLElement>('[fs-cmsfilter-element="list"]');

    if (!faqList) return;

    // Fonction pour vérifier et ajuster la visibilité de la catégorie
    const adjustCategoryVisibility = () => {
      const isHidden = window.getComputedStyle(faqList).display === 'none';
      category.style.display = isHidden ? 'none' : 'block';
    };

    // Observer les changements de style
    const observer = new MutationObserver(adjustCategoryVisibility);

    observer.observe(faqList, {
      attributes: true,
      attributeFilter: ['style'],
    });

    // Vérification initiale
    adjustCategoryVisibility();
  });
  // Appeler la fonction après le chargement du DOM ou après l'application des filtres
  document.addEventListener('DOMContentLoaded', () => {
    checkAndHideEmptyCategories();
  });
}

export function toggleFaqEmptyVisibility() {
  // Sélectionnez les éléments .faq_empty et .section_faq_cta
  const faqEmpty = document.querySelector<HTMLElement>('.faq_empty');
  const sectionFaqCta = document.querySelector<HTMLElement>('.section_faq_cta');

  if (!faqEmpty || !sectionFaqCta) return;

  // Fonction pour vérifier l'état des catégories FAQ
  const checkFaqCategories = () => {
    // Sélectionnez toutes les catégories FAQ
    const faqCategories = document.querySelectorAll<HTMLElement>('.faq_categorie');

    // Vérifiez si toutes les catégories sont masquées
    const allHidden = Array.from(faqCategories).every(
      (category) => category.style.display === 'none'
    );

    // Ajustez l'affichage de .faq_empty et .section_faq_cta en fonction de l'état des catégories
    if (allHidden) {
      faqEmpty.style.display = 'block';
      sectionFaqCta.style.display = 'none';
    } else {
      faqEmpty.style.display = 'none';
      sectionFaqCta.style.display = 'block';
    }
  };

  // Observer les changements de style sur chaque catégorie FAQ
  const faqCategories = document.querySelectorAll<HTMLElement>('.faq_categorie');
  faqCategories.forEach((category) => {
    const observer = new MutationObserver(checkFaqCategories);
    observer.observe(category, {
      attributes: true,
      attributeFilter: ['style'],
    });
  });

  // Vérification initiale
  checkFaqCategories();
}
