import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { loadScript } from '../global/loadScript';

gsap.registerPlugin(ScrollTrigger);

export async function initCmsFilter() {
  // Vérifie si l'URL contient 'blog'
  if (!window.location.pathname.includes('blog')) return;

  try {
    // Charge le script CMS Filter
    await loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsfilter@1/cmsfilter.js');
  } catch (error) {
    console.error('Erreur lors du chargement de CMS Filter:', error);
  }
}

export async function initTocScript() {
  if (!window.location.pathname.includes('blog')) return;

  try {
    await loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-toc@1/toc.js');
  } catch (error) {
    console.error('Erreur lors du chargement du TOC:', error);
  }
}

// Fonction pour charger le script de partage social
export async function initSocialShare() {
  if (!window.location.pathname.includes('blog')) return;

  // Charger le script de Refokus
  await loadScript('https://tools.refokus.com/social-share/bundle.v1.0.0.js');

  // Initialiser le bouton de partage
  const shareButton = document.getElementById('share-button');
  if (!shareButton) return;

  shareButton.addEventListener('click', async () => {
    // Récupérer l'URL et le titre
    const articleUrl = window.location.href;
    const articleTitle = shareButton.getAttribute('data-title') || '';

    // Vérifier si l'API Web Share est supportée
    if (navigator.share) {
      await navigator.share({
        title: articleTitle,
        url: articleUrl,
      });
    } else {
      alert("Le partage via navigateur n'est pas supporté sur cet appareil.");
    }
  });
}

// Initialize blog sections visibility based on search field state
export function initBlogSections(): void {
  // Get DOM elements
  const sectionState1 = document.querySelector<HTMLElement>('.section_state1');
  const sectionState2 = document.querySelector<HTMLElement>('.section_state2');
  const sectionState3 = document.querySelector<HTMLElement>('.section_state3');
  const blogField = document.querySelector<HTMLInputElement>('#blog-field');

  // Exit if any element is missing
  if (!sectionState1 || !sectionState2 || !sectionState3 || !blogField) {
    return;
  }

  const updateSections = (isClicked: boolean = false): void => {
    const isEmpty = blogField.value.trim() === '';

    if (isEmpty && !isClicked) {
      // Empty state - show initial view
      sectionState1.style.display = 'block';
      sectionState2.style.display = 'none';
      sectionState3.style.display = 'none';
    } else if (isEmpty && isClicked) {
      // Clicked but empty - show section 2
      sectionState1.style.display = 'none';
      sectionState2.style.display = 'block';
      sectionState3.style.display = 'none';
    } else {
      // Has value - show section 3
      sectionState1.style.display = 'none';
      sectionState2.style.display = 'none';
      sectionState3.style.display = 'block';
    }
  };

  // Initial display state
  updateSections();

  // Event listeners
  blogField.addEventListener('click', () => updateSections(true));
  blogField.addEventListener('input', () => updateSections(false));
  blogField.addEventListener('blur', () => {
    setTimeout(() => updateSections(false), 200);
  });
}

//Function to transcribe the search bar
export function mirrorBlogSearch() {
  const blogField = document.querySelector<HTMLElement>('#blog-field');
  const searchMirror = document.getElementById('blog-all-articles_search-mirror');

  if (!blogField || !searchMirror) {
    return;
  }

  // Add event listener for input field
  blogField.addEventListener('input', () => {
    const inputText = (blogField as HTMLInputElement).value; // Retrieve input value
    searchMirror.innerHTML = `&nbsp;${inputText}`; // Add space
  });
}

// Function to handle placeholder styling during input
export function searchBarPlaceholderStyling() {
  const inputField = document.querySelector<HTMLInputElement>('.header_v4_blog-field');

  if (!inputField) {
    return;
  }

  // Event listener for input event
  inputField.addEventListener('input', () => {
    if (inputField.value.trim() !== '') {
      inputField.classList.add('placeholder-active');
    } else {
      inputField.classList.remove('placeholder-active');
    }
  });
}

// Show 'Guide & Études de cas' when user comes from hub page
export function handleGuideFilter() {
  if (window.location.href.includes('?category=Guide')) {
    // Gestion des sections
    const sectionState1 = document.querySelector('.section_state1') as HTMLElement;
    const sectionState2 = document.querySelector('.section_state2') as HTMLElement;
    const sectionsBlogMenu = document.querySelectorAll('.section_blog_menu');
    const sectionAllArticles = document.querySelector('.section_blog_all-articles') as HTMLElement;
    const sectionGuideEtude = document.querySelector('.section_blog_guide') as HTMLElement;
    const sectionState3 = document.querySelector('.section_state3') as HTMLElement;

    if (
      sectionState1 &&
      sectionState2 &&
      sectionState3 &&
      sectionsBlogMenu &&
      sectionAllArticles &&
      sectionGuideEtude
    ) {
      sectionState1.style.display = 'none';
      sectionState2.style.display = 'block';
      // Utiliser forEach pour appliquer le style à tous les éléments avec la même classe
      sectionsBlogMenu.forEach((menu) => {
        (menu as HTMLElement).style.display = 'none';
      });
      sectionAllArticles.style.display = 'none';
      sectionGuideEtude.style.display = 'block';
      sectionState3.style.display = 'none';
    }
  }
}

export function blogMenuVisibility() {
  const blogMenus = document.querySelectorAll('.section_blog_menu'); // Sélectionne tous les éléments

  if (window.innerWidth < 750) {
    // Cache tous les éléments si la largeur de l'écran est inférieure à 750px
    blogMenus.forEach((blogMenu) => {
      (blogMenu as HTMLElement).style.display = 'none'; // Type assertion
    });
  } else {
    // Affiche tous les éléments si la largeur de l'écran est supérieure ou égale à 750px
    blogMenus.forEach((blogMenu) => {
      (blogMenu as HTMLElement).style.display = 'block'; // ou 'flex', selon votre besoin
    });
  }
}

// Big card ressources
export const animateBigCardRessource = (): void => {
  const element = document.querySelector('.ressources_bc-top-row');

  // Fonction pour ajouter les événements d'animation
  const addHoverEvents = () => {
    if (element) {
      // Appliquer l'état initial uniquement si la taille d'écran est > 991px
      gsap.set(element, { borderRadius: '0.5rem 5rem 0.5rem 5rem' });

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    }
  };

  // Fonction pour retirer les événements d'animation
  const removeHoverEvents = () => {
    if (element) {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      gsap.set(element, { clearProps: 'all' }); // Nettoyer les styles si taille d'écran <= 991px
    }
  };

  // Gestionnaire pour l'événement mouseenter
  const handleMouseEnter = () => {
    if (element) {
      gsap.to(element, {
        duration: 0.3,
        borderRadius: '5rem 0.5rem 5rem 0.5rem',
        ease: 'power2.out',
      });
    }
  };

  // Gestionnaire pour l'événement mouseleave
  const handleMouseLeave = () => {
    if (element) {
      gsap.to(element, {
        duration: 0.3,
        borderRadius: '0.5rem 5rem 0.5rem 5rem',
        ease: 'power2.out',
      });
    }
  };

  // Fonction pour vérifier la taille d'écran
  const checkScreenSize = () => {
    if (window.innerWidth > 991) {
      addHoverEvents(); // Appliquer état initial et événements si écran > 991px
    } else {
      removeHoverEvents(); // Supprimer les animations et styles si écran ≤ 991px
    }
  };

  // Initialisation au chargement
  checkScreenSize();

  // Ajoute un écouteur pour gérer les changements de taille de l'écran
  window.addEventListener('resize', checkScreenSize);
};

// Small card ressources
export const animateSmallCardRessource = (): void => {
  const elements = document.querySelectorAll('.hp_blog_small-card.is-coop');

  const addHoverEvents = () => {
    elements.forEach((element) => {
      const frontImage = element.querySelector('.hp_blog_sc-img-front');
      const hoverImage = element.querySelector('.hp_blog_sc-img-hover');

      if (frontImage && hoverImage) {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      }
    });
  };

  const removeHoverEvents = () => {
    elements.forEach((element) => {
      const frontImage = element.querySelector('.hp_blog_sc-img-front');
      const hoverImage = element.querySelector('.hp_blog_sc-img-hover');

      if (frontImage && hoverImage) {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    });
  };

  const handleMouseEnter = (event: Event) => {
    const element = event.currentTarget as HTMLElement;
    const frontImage = element.querySelector<HTMLElement>('.hp_blog_sc-img-front');
    const hoverImage = element.querySelector<HTMLElement>('.hp_blog_sc-img-hover');

    if (frontImage && hoverImage) {
      gsap.to(element, {
        duration: 0.3,
        borderRadius: '2.5rem 0.5rem 2.5rem 0.5rem',
        ease: 'power2.out',
      });
      gsap.to(frontImage, { opacity: 0, duration: 0.3, ease: 'power2.out' });
      gsap.to(hoverImage, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = (event: Event) => {
    const element = event.currentTarget as HTMLElement;
    const frontImage = element.querySelector<HTMLElement>('.hp_blog_sc-img-front');
    const hoverImage = element.querySelector<HTMLElement>('.hp_blog_sc-img-hover');

    if (frontImage && hoverImage) {
      gsap.to(element, {
        duration: 0.3,
        borderRadius: '0.5rem 2.5rem 0.5rem 2.5rem',
        ease: 'power2.out',
      });
      gsap.to(frontImage, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(hoverImage, { opacity: 0, duration: 0.3, ease: 'power2.out' });
    }
  };

  const checkScreenSize = () => {
    if (window.innerWidth > 991) {
      addHoverEvents();
    } else {
      removeHoverEvents();
    }
  };

  // Initial check and resize listener
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
};

// Last news card
export const animateLastNewsCard = (): void => {
  const elements = document.querySelectorAll('.blog_last-posts_img-wrapper');

  const addHoverEvents = () => {
    elements.forEach((element) => {
      const overlay = element.querySelector('.blog_last-posts_overlay');
      if (overlay) {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      }
    });
  };

  const removeHoverEvents = () => {
    elements.forEach((element) => {
      const overlay = element.querySelector('.blog_last-posts_overlay');
      if (overlay) {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    });
  };

  const handleMouseEnter = (event: Event) => {
    const element = event.currentTarget as HTMLElement;
    const overlay = element.querySelector<HTMLElement>('.blog_last-posts_overlay');

    if (overlay) {
      gsap.to(element, {
        duration: 0.3,
        borderRadius: '0.5rem 2.5rem 0.5rem 2.5rem',
        ease: 'power2.out',
      });
      gsap.to(overlay, {
        duration: 0.3,
        opacity: 0.2,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = (event: Event) => {
    const element = event.currentTarget as HTMLElement;
    const overlay = element.querySelector<HTMLElement>('.blog_last-posts_overlay');

    if (overlay) {
      gsap.to(element, {
        duration: 0.3,
        borderRadius: '2.5rem 0.5rem 2.5rem 0.5rem',
        ease: 'power2.out',
      });
      gsap.to(overlay, {
        duration: 0.3,
        opacity: 0,
        ease: 'power2.out',
      });
    }
  };

  const checkScreenSize = () => {
    if (window.innerWidth > 991) {
      addHoverEvents();
    } else {
      removeHoverEvents();
    }
  };

  // Initial check and resize listener
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
};

export const animateSpecialSelectCard = (): void => {
  const elements = document.querySelectorAll('.blog_last-posts_selection-img-wrapper');

  const addHoverEvents = () => {
    elements.forEach((element) => {
      // Initial border style
      gsap.set(element, {
        borderRadius: '1rem 0.25rem 1rem 0.25rem',
        borderColor: '#f4dddc',
        borderWidth: '1px',
        borderStyle: 'solid',
      });

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
  };

  const removeHoverEvents = () => {
    elements.forEach((element) => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    });
  };

  const handleMouseEnter = (event: Event) => {
    const element = event.currentTarget as HTMLElement;

    gsap.to(element, {
      duration: 0.3,
      borderRadius: '0.25rem 1rem 0.25rem 1rem',
      borderColor: '#5a1f1b',
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (event: Event) => {
    const element = event.currentTarget as HTMLElement;

    gsap.to(element, {
      duration: 0.3,
      borderRadius: '1rem 0.25rem 1rem 0.25rem',
      borderColor: '#f4dddc',
      ease: 'power2.out',
    });
  };

  const checkScreenSize = () => {
    if (window.innerWidth > 991) {
      addHoverEvents();
    } else {
      removeHoverEvents();
    }
  };

  // Vérifie la taille de l'écran au chargement
  checkScreenSize();

  // Ajoute un écouteur d'événements pour les changements de taille de la fenêtre
  window.addEventListener('resize', checkScreenSize);
};

// Fonction générique pour gérer les filtres du menu blog
export function setBlogMenuFilters(language: 'fr' | 'en'): void {
  // Définir les valeurs de filtres selon la langue
  const filters = {
    fr: [
      { id: 'blog_menu-guide', value: 'Guide pratique' },
      { id: 'blog_menu-etudes', value: 'Chez les producteurs' },
      { id: 'blog_menu-chocolaterie', value: 'Chocolaterie' },
      { id: 'blog_menu-expertise', value: 'Expertise Cacao' },
      { id: 'blog_menu-commerce', value: 'Commerce équitable' },
    ],
    en: [
      { id: 'blog_menu-guide', value: 'how-to guide' },
      { id: 'blog_menu-etudes', value: 'With producers' },
      { id: 'blog_menu-chocolaterie', value: 'Chocolate Factory' },
      { id: 'blog_menu-expertise', value: 'cocoa expertise' },
      { id: 'blog_menu-commerce', value: 'Fair Trade' },
    ],
  }[language];

  // Get search field element
  const searchField = document.getElementById('blog-field') as HTMLInputElement;
  if (!searchField) return;

  // Set up click handlers for each filter button
  filters.forEach(({ id, value }) => {
    const button = document.getElementById(id);
    if (!button) return;

    button.addEventListener('click', (e: Event) => {
      e.preventDefault();
      searchField.value = value;
      searchField.dispatchEvent(new Event('input', { bubbles: true }));
    });
  });
}

// Fonctions d'initialisation spécifiques pour chaque langue
export const initFrenchBlogMenu = () => setBlogMenuFilters('fr');
export const initEnglishBlogMenu = () => setBlogMenuFilters('en');
