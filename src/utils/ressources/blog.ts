import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Function to check if `?tous-les-articles` in the URL
export function checkURLParameter() {
  const sectionState1 = document.querySelector<HTMLElement>('.section_state1');
  const sectionState2 = document.querySelector<HTMLElement>('.section_state2');
  const sectionState3 = document.querySelector<HTMLElement>('.section_state3');

  if (!sectionState1 || !sectionState2 || !sectionState3) {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('tous-les-articles')) {
    sectionState1.style.display = 'none';
    sectionState2.style.display = 'block';
    sectionState3.style.display = 'none';
  }
}

// Function to init view
export function initBlogSections() {
  const sectionState1 = document.querySelector<HTMLElement>('.section_state1');
  const sectionState2 = document.querySelector<HTMLElement>('.section_state2');
  const sectionState3 = document.querySelector<HTMLElement>('.section_state3');
  const blogField = document.querySelector<HTMLElement>('#blog-field');

  if (!sectionState1 || !sectionState2 || !sectionState3 || !blogField) {
    return;
  }

  // Initial display state
  sectionState1.style.display = 'block';
  sectionState2.style.display = 'none';
  sectionState3.style.display = 'none';

  // Check URL parameter on page load
  checkURLParameter();

  // Event listener for clicking on the input field
  blogField.addEventListener('click', () => {
    sectionState1.style.display = 'none';
    sectionState2.style.display = 'block';
    sectionState3.style.display = 'none';
  });

  // Event listener for typing in the input field
  blogField.addEventListener('input', () => {
    const inputValue = (blogField as HTMLInputElement).value;

    if (inputValue === '') {
      sectionState1.style.display = 'none';
      sectionState2.style.display = 'block';
      sectionState3.style.display = 'none';
    } else {
      sectionState1.style.display = 'none';
      sectionState2.style.display = 'none';
      sectionState3.style.display = 'block';
    }
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

//Big card ressources
export function animateBigCardRessource() {
  // Sélectionne l'élément à animer
  const element = document.querySelector('.ressources_bc-top-row');

  if (element) {
    // Applique un border-radius initial
    gsap.set(element, {
      borderRadius: '0.5rem 5rem 0.5rem 5rem', // Exemple de valeur (modifie-la selon le screen)
    });

    // Animation au hover pour inverser le border-radius
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        duration: 0.3, // Durée de l'animation
        borderRadius: '5rem 0.5rem 5rem 0.5rem', // Valeur inversée
        ease: 'power2.out', // Type d'animation
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        duration: 0.3,
        borderRadius: '0.5rem 5rem 0.5rem 5rem', // Retour à la valeur initiale
        ease: 'power2.out',
      });
    });
  }
}

//small card ressources
export function animateSmallCardRessource() {
  // Sélectionne tous les conteneurs
  const elements = document.querySelectorAll('.hp_blog_sc-img-container');

  elements.forEach((element) => {
    const frontImage = element.querySelector('.hp_blog_sc-img-front');
    const hoverImage = element.querySelector('.hp_blog_sc-img-hover');

    if (frontImage && hoverImage) {
      // Applique un border-radius initial et l’opacité initiale
      gsap.set(element, {
        borderRadius: '0.5rem 2.5rem 0.5rem 2.5rem',
      });
      gsap.set(frontImage, { opacity: 1 });
      gsap.set(hoverImage, { opacity: 0, position: 'absolute', top: 0, left: 0 });

      // Animation au hover pour inverser le border-radius et changer l'opacité
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          duration: 0.3,
          borderRadius: '2.5rem 0.5rem 2.5rem 0.5rem',
          ease: 'power2.out',
        });
        gsap.to(frontImage, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        gsap.to(hoverImage, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          duration: 0.3,
          borderRadius: '0.5rem 2.5rem 0.5rem 2.5rem',
          ease: 'power2.out',
        });
        gsap.to(frontImage, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(hoverImage, { opacity: 0, duration: 0.3, ease: 'power2.out' });
      });
    }
  });
}

// Last news card
export function animateLastNewsCard() {
  // Sélection de tous les éléments à animer
  const elements = document.querySelectorAll('.blog_last-posts_img-wrapper');

  elements.forEach((element) => {
    // Sélection de l'overlay
    const overlay = element.querySelector('.blog_last-posts_overlay');

    // Applique un border-radius initial et enlève tout filtre
    gsap.set(element, {
      borderRadius: '2.5rem 0.5rem 2.5rem 0.5rem',
      borderColor: '#f4dddc', // Couleur de bordure initiale
      borderWidth: '1px', // Assurez-vous que la bordure est visible
      borderStyle: 'solid', // Assurez-vous que la bordure est de type solide
    });

    // Assure que l'overlay est caché au départ
    if (overlay) {
      gsap.set(overlay, { opacity: 0 });
    }

    // Animation au hover pour inverser le border-radius et appliquer l'opacité de l'overlay
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        duration: 0.3, // Durée de l'animation
        borderRadius: '0.5rem 2.5rem 0.5rem 2.5rem', // Border-radius inversé
        borderColor: '#5a1f1b', // Couleur de bordure au survol
        ease: 'power2.out',
      });
      if (overlay) {
        gsap.to(overlay, {
          duration: 0.3,
          opacity: 0.2, // Opacité à 20%
          ease: 'power2.out',
        });
      }
    });

    // Retour à l'état initial lorsque le survol cesse
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        duration: 0.3,
        borderRadius: '2.5rem 0.5rem 2.5rem 0.5rem',
        borderColor: '#f4dddc', // Couleur de bordure initiale
        ease: 'power2.out',
      });
      if (overlay) {
        gsap.to(overlay, {
          duration: 0.3,
          opacity: 0, // Retour à l'opacité 0%
          ease: 'power2.out',
        });
      }
    });
  });
}

// Special Select Card
export function animateSpecialSelectCard() {
  // Sélection de tous les éléments à animer
  const elements = document.querySelectorAll('.blog_last-posts_selection-img-wrapper');

  elements.forEach((element) => {
    // Applique un border-radius initial et enlève tout filtre
    gsap.set(element, {
      borderRadius: '1rem 0.25rem 1rem 0.25rem',
      borderColor: '#f4dddc', // Couleur de bordure initiale
      borderWidth: '1px', // Assurez-vous que la bordure est visible
      borderStyle: 'solid', // Assurez-vous que la bordure est de type solide
    });

    // Animation au hover pour inverser le border-radius et appliquer l'opacité de l'overlay
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        duration: 0.3, // Durée de l'animation
        borderRadius: '0.25rem 1rem 0.25rem 1rem', // Border-radius inversé
        borderColor: '#5a1f1b', // Couleur de bordure au survol
        ease: 'power2.out',
      });
    });

    // Retour à l'état initial lorsque le survol cesse
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        duration: 0.3,
        borderRadius: '1rem 0.25rem 1rem 0.25rem',
        borderColor: '#f4dddc', // Couleur de bordure initiale
        ease: 'power2.out',
      });
    });
  });
}
