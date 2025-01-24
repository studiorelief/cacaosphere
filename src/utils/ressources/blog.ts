import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const inputField = document.querySelector<HTMLInputElement>('.header_v3_blog-field');

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

export function observeTocLinks() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.target instanceof HTMLElement) {
        if (mutation.target.matches('[fs-toc-element="link"].w--current')) {
          const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <g clip-path="url(#clip0_2387_2341)">
              <path d="M7.42179 0.189242C7.67405 0.208795 7.92601 0.230771 8.1774 0.256517C8.153 0.260093 7.93519 0.246207 8.07987 0.264084C8.02129 0.263611 7.858 0.245045 7.80416 0.233561L7.84377 0.243852C7.67098 0.215777 7.54985 0.2307 7.66279 0.246434L7.64801 0.245237C7.48864 0.216462 7.32898 0.190109 7.16876 0.164292C7.34636 0.174349 7.30435 0.188563 7.51775 0.205647C7.45073 0.199716 7.43135 0.192553 7.42179 0.189242Z" fill="#42612D"/>
              <!-- Ajoutez ici le reste de votre SVG -->
            </g>
            <defs>
              <clipPath id="clip0_2387_2341">
                <rect width="12" height="12" fill="white"/>
              </clipPath>
            </defs>
          </svg>`;

          if (!mutation.target.querySelector('svg')) {
            mutation.target.insertAdjacentHTML('beforeend', svg);
          }
        }
      }
    });
  });

  const links = document.querySelectorAll('[fs-toc-element="link"]');
  links.forEach((link) => {
    observer.observe(link, { attributes: true });
  });
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

/**
 * Sets up click handlers for blog menu buttons to update search field
 */
export function setBlogMenuFilters(): void {
  // Define filter buttons and their corresponding search values
  const filters = [
    { id: 'blog_menu-guide', value: 'Guide' },
    { id: 'blog_menu-etudes', value: 'Étude' },
    { id: 'blog_menu-chocolaterie', value: 'Chocolaterie' },
    { id: 'blog_menu-interview', value: 'Interview' },
  ];

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
