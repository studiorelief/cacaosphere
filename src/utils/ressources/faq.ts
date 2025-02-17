import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function filterFAQCategories() {
  // Sélectionnez l'élément de saisie et les éléments à masquer
  const inputField = document.querySelector<HTMLInputElement>('.header_v4_blog-field');
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
  const faqField = document.querySelector<HTMLInputElement>('.header_v4_blog-field');
  const searchMirror = document.getElementById('faq_search-mirror');

  if (!faqField || !searchMirror) {
    return;
  }

  // Add event listener for input field
  faqField.addEventListener('input', () => {
    const inputText = faqField.value.trim(); // Retrieve input value and trim whitespace
    searchMirror.innerHTML = inputText ? `&nbsp;${inputText}` : ''; // Add space only if there's text
  });
}

//See the progress in FAQ Categories
export function linkFaqCategoryAnimations() {
  const linksAndTriggers = [
    { link: '#link-cat1', trigger: '#faq-cat1', icon: '.faq_cat-row:nth-child(1) .faq_cat-icon' },
    { link: '#link-cat2', trigger: '#faq-cat2', icon: '.faq_cat-row:nth-child(2) .faq_cat-icon' },
    { link: '#link-cat3', trigger: '#faq-cat3', icon: '.faq_cat-row:nth-child(3) .faq_cat-icon' },
    { link: '#link-cat4', trigger: '#faq-cat4', icon: '.faq_cat-row:nth-child(4) .faq_cat-icon' },
    { link: '#link-cat5', trigger: '#faq-cat5', icon: '.faq_cat-row:nth-child(5) .faq_cat-icon' },
  ];

  // Function to handle animations
  const animateCategory = (linkElement: Element, iconElement: Element, isActive: boolean) => {
    gsap.to(iconElement, {
      opacity: isActive ? 1 : 0,
      duration: 0.3,
      ease: 'power2.out',
    });
    gsap.to(linkElement, {
      color: isActive ? '#42612d' : 'rgb(90, 31, 27)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  linksAndTriggers.forEach(({ link, trigger, icon }, index) => {
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
        // Animate current and previous categories
        for (let i = 0; i <= index; i++) {
          const prevLink = document.querySelector(linksAndTriggers[i].link);
          const prevIcon = document.querySelector(linksAndTriggers[i].icon);
          if (prevLink && prevIcon) {
            animateCategory(prevLink, prevIcon, true);
          }
        }
      },
      onLeaveBack: () => {
        // When scrolling back up, deactivate current category
        animateCategory(linkElement, iconElement, false);
      },
    });

    // Click handler
    linkElement.addEventListener('click', () => {
      linksAndTriggers.forEach(({ link: l, icon: i }, i_index) => {
        const otherLink = document.querySelector(l);
        const otherIcon = document.querySelector(i);
        if (otherLink && otherIcon) {
          // Activate all categories up to and including the clicked one
          const shouldBeActive = i_index <= index;
          animateCategory(otherLink, otherIcon, shouldBeActive);
        }
      });
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

export function handleEmptyFaqCategory() {
  // Select all FAQ categories and UI elements
  const faqCategories = document.querySelectorAll('[id^="faq-cat"]');
  const faqEmpty = document.querySelector('.faq_empty');
  const faqCta = document.querySelector('.section_faq_cta');

  // Function to check and handle visibility of individual category headers
  const checkContent = (category: Element) => {
    const faqHeaderCat = category.querySelector('.faq_header-cat');
    const faqList = category.querySelector('.faq_category-list');

    if (!faqHeaderCat || !faqList) return;

    // Check if the list is empty or hidden by Finsweet filtering
    const isListEmpty = faqList.getAttribute('style')?.includes('display: none');

    // Toggle header visibility based on list content
    if (isListEmpty) {
      (faqHeaderCat as HTMLElement).style.display = 'none';
    } else {
      (faqHeaderCat as HTMLElement).style.display = 'flex';
    }
  };

  // Function to check if all FAQ lists are empty and handle UI accordingly
  const checkAllEmpty = () => {
    const allLists = document.querySelectorAll('.faq_category-list');
    // Check if every list is hidden (filtered out)
    const allEmpty = Array.from(allLists).every((list) =>
      list.getAttribute('style')?.includes('display: none')
    );

    // Toggle "no results" message visibility
    if (faqEmpty) {
      (faqEmpty as HTMLElement).style.display = allEmpty ? 'block' : 'none';
    }

    // Toggle CTA section visibility based on search results
    if (faqCta) {
      (faqCta as HTMLElement).style.display = allEmpty ? 'none' : 'block';
    }
  };

  // Set up mutation observer to watch for Finsweet filtering changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const category = (mutation.target as Element).closest('[id^="faq-cat"]');
      if (category) {
        checkContent(category);
      }
    });
    checkAllEmpty();
  });

  // Initialize observation for each category
  faqCategories.forEach((category) => {
    // Initial check of category content
    checkContent(category);

    // Start observing the FAQ list for changes
    const faqList = category.querySelector('.faq_category-list');
    if (faqList) {
      observer.observe(faqList, {
        attributes: true, // Watch for style changes
        childList: true, // Watch for content changes
        subtree: true, // Watch for nested changes
      });
    }
  });

  // Initial check of global state
  checkAllEmpty();
}
