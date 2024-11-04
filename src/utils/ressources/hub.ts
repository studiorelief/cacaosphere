import { gsap } from 'gsap';

export function animateHubActionCardHover() {
  // Sélection de tous les éléments à animer
  const cards = document.querySelectorAll('.hub_action_card');

  cards.forEach((card) => {
    // Récupère les éléments enfants nécessaires
    const overlay = card.querySelector('.hub_action_overlay') as HTMLElement;
    const textContent = card.querySelector('.hub_action_text-content') as HTMLElement;

    // Vérifie si les éléments existent avant d'ajouter les événements
    if (overlay && textContent) {
      // Ajoute un écouteur pour l'événement "mouseenter" (au survol)
      card.addEventListener('mouseenter', () => {
        // Fait apparaître l'overlay
        overlay.style.opacity = '80%';

        // Anime le texte pour le faire glisser vers le haut
        gsap.to(textContent, {
          duration: 0.3,
          bottom: '-2rem',
          ease: 'power3.out',
        });
      });

      // Ajoute un écouteur pour l'événement "mouseleave" (quand le survol cesse)
      card.addEventListener('mouseleave', () => {
        // Cache l'overlay
        overlay.style.opacity = '0%';

        // Anime le texte pour le remettre dans sa position initiale
        gsap.to(textContent, {
          duration: 0.3,
          bottom: '-9.1rem',
          ease: 'power3.out',
        });
      });
    }
  });
}

export function setupTestimonialToggle() {
  const moreWrappers = document.querySelectorAll<HTMLElement>('.hub_testimonial_logo-more-wrapper');
  const lessWrappers = document.querySelectorAll<HTMLElement>(
    '.hub_testimonial_hover-less-logo-wrapper'
  );
  const frontCards = document.querySelectorAll<HTMLElement>('.hub_testimonial_front-card');
  const hoverCards = document.querySelectorAll<HTMLElement>('.hub_testimonial_hover-card');
  moreWrappers.forEach((moreWrapper, index) => {
    const frontCard = frontCards[index];
    const hoverCard = hoverCards[index];

    moreWrapper.addEventListener('click', () => {
      frontCard.style.transition = 'opacity 0.3s ease';
      hoverCard.style.transition = 'opacity 0.3s ease';

      frontCard.style.opacity = '0';
      hoverCard.style.opacity = '1';
      hoverCard.style.zIndex = '1'; // Mettre le z-index à 1 pour s'assurer qu'il est au-dessus

      setTimeout(() => {
        frontCard.classList.add('hidden'); // Ajouter la classe cachée après l'animation
      }, 300);
    });
  });

  lessWrappers.forEach((lessWrapper, index) => {
    const frontCard = frontCards[index];
    const hoverCard = hoverCards[index];

    lessWrapper.addEventListener('click', () => {
      frontCard.classList.remove('hidden');
      frontCard.style.opacity = '1';
      hoverCard.style.opacity = '0';
      hoverCard.style.zIndex = '-1'; // Remettre le z-index à -1 pour le cacher

      setTimeout(() => {
        hoverCard.style.transition = 'opacity 0.3s ease';
        hoverCard.style.opacity = '0'; // Ou le régler à 0 directement
      }, 0);
    });
  });
}

export function toggleTestimonialVisibility() {
  const toggleButton = document.getElementById('hub-show-testimonial') as HTMLElement;
  const testimonialWrapper = document.querySelector<HTMLElement>('.hub_testimonial_list-wrapper2');

  if (!toggleButton || !testimonialWrapper) return;

  let isVisible = false;
  const originalText = toggleButton.textContent || ''; // Sauvegarder le texte original

  toggleButton.addEventListener('click', () => {
    isVisible = !isVisible;
    testimonialWrapper.style.display = isVisible ? 'block' : 'none';

    // Modifier le texte en fonction de l'état d'affichage
    toggleButton.textContent = isVisible ? 'Voir moins de témoignages' : originalText;
  });
}

// Fonction pour gérer l'animation de hover sur .hub_galerie_card
export const animateHubGalerieCardHover = (): void => {
  // Sélectionne toutes les cartes de la galerie
  const cards = document.querySelectorAll('.hub_galerie_card');

  // Applique les animations de hover et mouseleave à chaque carte
  cards.forEach((card) => {
    const textContent = card.querySelector<HTMLElement>('.hub_galerie_text-content');

    // Vérifie si l'élément de texte existe dans la carte avant de continuer
    if (textContent) {
      // Définit l'animation pour le hover
      card.addEventListener('mouseenter', () => {
        gsap.to(textContent, {
          top: '0rem', // Position finale au hover
          backgroundColor: 'rgba(90, 31, 27, 0.8)', // Couleur de fond avec 80% d'opacité
          duration: 0.5, // Durée de la transition
          ease: 'power3.out', // Effet de fluidité
        });
      });

      // Définit l'animation pour le mouseleave
      card.addEventListener('mouseleave', () => {
        gsap.to(textContent, {
          top: '15rem', // Position initiale au mouseleave
          backgroundColor: 'transparent', // Couleur de fond initiale
          duration: 0.5, // Durée de la transition
          ease: 'power3.out', // Effet de fluidité
        });
      });
    }
  });
};

export function applyMarginToHubGalerie() {
  // Sélectionne tous les éléments avec la classe '.hub_galerie_card'
  const cards = document.querySelectorAll('.hub_galerie_card');

  // Applique un margin-top de 2.5rem à chaque deuxième élément
  cards.forEach((card, index) => {
    if (index % 2 === 0) {
      (card as HTMLElement).style.marginTop = '2.5rem';
    }
  });
}
