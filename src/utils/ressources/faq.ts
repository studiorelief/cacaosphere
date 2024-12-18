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

//Function to transcribe the search bar
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

//Function to see the progress in FAQ Categories
export function linkFaqCategoryAnimations() {
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

    // Initial settings
    gsap.set(iconElement, { opacity: 0 });
    gsap.set(linkElement, { color: 'rgb(90, 31, 27)' });

    // ScrollTrigger animation
    gsap.to(linkElement, {
      scrollTrigger: {
        trigger: trigger,
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
      },
    });
  });

  //  "sticky" pour faqLeftCol
  /*const faqLeftCol = document.querySelector('.faq_left-col') as HTMLElement | null;
  if (faqLeftCol) {
    faqLeftCol.style.position = 'sticky';
    faqLeftCol.style.top = '5rem';
  }*/

  // "sticky" for faqLeftCol only for screens larger than 991px
  const faqLeftCol = document.querySelector('.faq_left-col') as HTMLElement | null;

  if (faqLeftCol) {
    const mediaQuery = window.matchMedia('(min-width: 992px)'); // Only for screens wider than 991px

    const applyStickyPosition = () => {
      if (mediaQuery.matches) {
        // Apply sticky styles
        faqLeftCol.style.position = 'sticky';
        faqLeftCol.style.top = '5rem';
      } else {
        // Reset styles for smaller screens
        faqLeftCol.style.position = '';
        faqLeftCol.style.top = '';
      }
    };

    // Apply styles on load
    applyStickyPosition();

    // Listen for changes in screen size
    mediaQuery.addEventListener('change', applyStickyPosition);
  }
}
