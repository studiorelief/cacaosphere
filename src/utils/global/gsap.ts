import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* -------- BLOG --------- */
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

/* -------- BLOG --------- */
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

/* -------- BLOG --------- */
// Last news card
export function animateLastNewsCard() {
  // Sélection de tous les éléments à animer
  const elements = document.querySelectorAll('.blog-last-posts_img-wrapper');

  elements.forEach((element) => {
    // Sélection de l'overlay
    const overlay = element.querySelector('.blog-last-posts_overlay');

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

/* -------- BLOG --------- */
// Special Select Card
export function animateSpecialSelectCard() {
  // Sélection de tous les éléments à animer
  const elements = document.querySelectorAll('.blog-last-post_selection-img-wrapper');

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
