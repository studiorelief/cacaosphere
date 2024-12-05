import { gsap } from 'gsap';

// Show more items in Collection List
export function showMoreItems(type: 'testimonial' | 'galerie' | 'download' | 'action') {
  const toggleButton = document.getElementById(`hub-show-${type}`) as HTMLElement;
  const wrapper = document.querySelector<HTMLElement>(`.hub_${type}_list-wrapper2`);

  if (!toggleButton || !wrapper) return;

  let isVisible = false;
  const originalText = toggleButton.textContent || ''; // Save initial button text

  // Définir le texte "voir moins" en fonction du type
  const getLessText = (itemType: typeof type): string => {
    const texts = {
      testimonial: 'Voir moins de témoignages',
      galerie: 'Voir moins de réalisations',
      download: 'Voir moins de téléchargements',
      action: 'Voir moins de vidéos',
    };
    return texts[itemType];
  };

  toggleButton.addEventListener('click', () => {
    isVisible = !isVisible;
    wrapper.style.display = isVisible ? 'block' : 'none';

    // Change text based on view state and type
    toggleButton.textContent = isVisible ? getLessText(type) : originalText;
  });
}

// Shows the text of the testimonial card
export function showContentTestimonialCard() {
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
      hoverCard.style.zIndex = '1'; // Set the z-index to 1 to ensure it is above

      setTimeout(() => {
        frontCard.classList.add('hidden'); // Add hidden class after animation
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
      hoverCard.style.zIndex = '-1'; // Reset the z-index to -1 to hide it
      setTimeout(() => {
        hoverCard.style.transition = 'opacity 0.3s ease';
        hoverCard.style.opacity = '0'; // Ou le régler à 0 directement
      }, 0);
    });
  });
}

// Hover animation on VIDEO CARD
export function hoverOnVideoCard() {
  const cards = document.querySelectorAll('.hub_action_card');

  // Gestionnaires d'événements
  const handleMouseEnter = (event: Event) => {
    const target = event.currentTarget as HTMLElement;
    const overlay = target.querySelector('.hub_action_overlay') as HTMLElement;
    const textContent = target.querySelector('.hub_action_text-content') as HTMLElement;
    const playWrapper = target.querySelector('.hub_action_play-wrapper') as HTMLElement;

    if (overlay && textContent) {
      overlay.style.opacity = '80%';

      // Vérifier si la carte et le texte ont la classe combinée .is-home
      const isHome =
        target.classList.contains('is-home') && textContent.classList.contains('is-home');
      const topPosition = isHome ? '12.2rem' : '17.5rem';

      gsap.to(textContent, {
        duration: 0.3,
        top: topPosition,
        ease: 'power3.out',
      });

      // Modifier la position de hub_action_play-wrapper si isHome
      if (isHome && playWrapper) {
        gsap.to(playWrapper, {
          duration: 0.3,
          top: '8rem',
          ease: 'power3.out',
        });
      }
    }
  };

  const handleMouseLeave = (event: Event) => {
    const target = event.currentTarget as HTMLElement;
    const overlay = target.querySelector('.hub_action_overlay') as HTMLElement;
    const textContent = target.querySelector('.hub_action_text-content') as HTMLElement;
    const playWrapper = target.querySelector('.hub_action_play-wrapper') as HTMLElement;

    if (overlay && textContent) {
      overlay.style.opacity = '0%';

      // Vérifier si la carte et le texte ont la classe combinée .is-home
      const isHome =
        target.classList.contains('is-home') && textContent.classList.contains('is-home');
      const initialTop = isHome ? '16.8rem' : '25.2rem';

      gsap.to(textContent, {
        duration: 0.3,
        top: initialTop,
        ease: 'power3.out',
      });

      // Réinitialiser la position de hub_action_play-wrapper si isHome
      if (isHome && playWrapper) {
        gsap.to(playWrapper, {
          duration: 0.3,
          top: 'auto', // Retour à la position initiale auto
          ease: 'power3.out',
        });
      }
    }
  };

  // Ajouter ou retirer les événements de survol
  const toggleHoverEvents = (addEvents: boolean) => {
    cards.forEach((card) => {
      const method = addEvents ? 'addEventListener' : 'removeEventListener';
      card[method]('mouseenter', handleMouseEnter);
      card[method]('mouseleave', handleMouseLeave);
    });
  };

  // Vérifier la taille de l'écran
  const checkScreenSize = () => {
    const isDesktop = window.innerWidth > 991;
    toggleHoverEvents(isDesktop); // Ajoute ou retire les événements selon la taille de l'écran
  };

  // Initialisation
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
}

export const hoverOnGalerieCard = (): void => {
  const cards = document.querySelectorAll('.hub_galerie_card');

  // Applies hover and mouseleave animations to each card
  cards.forEach((card) => {
    const textContent = card.querySelector<HTMLElement>('.hub_galerie_text-content');

    if (textContent) {
      // Determine if the card and text have the .is-home class
      const isHome =
        card.classList.contains('is-home') && textContent.classList.contains('is-home');

      // Set hover animation
      card.addEventListener('mouseenter', () => {
        gsap.to(textContent, {
          top: '0rem', // Final Position hover
          backgroundColor: 'rgba(90, 31, 27, 0.8)', // background with 80% opacity
          duration: 0.5,
          ease: 'power3.out',
        });
      });

      // Sets the animation for the mouseleave
      card.addEventListener('mouseleave', () => {
        const screenWidth = window.innerWidth; // Get the current screen width

        // Default position for non-home cards
        let initialTop = screenWidth < 480 ? '6.9rem' : '15rem';

        // Override position for home cards
        if (isHome) {
          initialTop = '18.2rem';
        }

        // Ensure the element returns to its initial position
        gsap.to(textContent, {
          top: initialTop, // Adjusted initial position at mouseleave
          backgroundColor: 'transparent', // Initial background-color
          duration: 0.5,
          ease: 'power3.out',
        });
      });

      // Ensure the initial position is set correctly on load
      const screenWidth = window.innerWidth; // Get the current screen width
      const initialTop = isHome ? '18.2rem' : screenWidth < 480 ? '6.9rem' : '15rem';
      textContent.style.top = initialTop;
    }
  });
};
// Hover on DOWNLOAD CARD
export const hoverOnDownloadCard = (): void => {
  const cards = document.querySelectorAll('.hub_donwload_card');

  // Add events on mouse enter
  const addHoverEvents = () => {
    cards.forEach((card) => {
      const textContent = card.querySelector<HTMLElement>('.hub_download_bottom-content');
      const logoWrapper = card.querySelector<HTMLElement>('.hub_donwload_logo-wrapper.is-visible');

      // If exists
      if (textContent && logoWrapper) {
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
      }
    });
  };

  // Delete events on mouse leave
  const removeHoverEvents = () => {
    cards.forEach((card) => {
      const textContent = card.querySelector<HTMLElement>('.hub_download_bottom-content');
      const logoWrapper = card.querySelector<HTMLElement>('.hub_donwload_logo-wrapper.is-visible');

      if (textContent && logoWrapper) {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    });
  };

  // Gestionnaires d'événements
  const handleMouseEnter = (event: Event) => {
    const textContent = (event.currentTarget as HTMLElement).querySelector<HTMLElement>(
      '.hub_download_bottom-content'
    );
    const logoWrapper = (event.currentTarget as HTMLElement).querySelector<HTMLElement>(
      '.hub_donwload_logo-wrapper.is-visible'
    );

    if (textContent && logoWrapper) {
      gsap.to(textContent, {
        top: '0rem', // Final Position hover
        backgroundColor: 'rgba(90, 31, 27, 0.8)', // background with 80% opacity
        duration: 0.5,
        ease: 'power3.out',
      });

      // Hide the logo
      gsap.to(logoWrapper, {
        display: 'none',
        duration: 0,
      });
    }
  };

  const handleMouseLeave = (event: Event) => {
    const textContent = (event.currentTarget as HTMLElement).querySelector<HTMLElement>(
      '.hub_download_bottom-content'
    );
    const logoWrapper = (event.currentTarget as HTMLElement).querySelector<HTMLElement>(
      '.hub_donwload_logo-wrapper.is-visible'
    );

    if (textContent && logoWrapper) {
      gsap.to(textContent, {
        top: '17rem', // Initial position at mouseleave
        backgroundColor: 'transparent', // Initial background color
        duration: 0.5,
        ease: 'power3.out',
      });

      // Show the logo
      gsap.to(logoWrapper, {
        display: 'block',
        duration: 0,
      });
    }
  };

  // Check screen size
  const checkScreenSize = () => {
    if (window.innerWidth > 991) {
      addHoverEvents(); // Add event
    } else {
      removeHoverEvents(); // Delete event
    }
  };

  // Vérifie la taille de l'écran au chargement
  checkScreenSize();

  // Ajoute un écouteur d'événements pour les changements de taille de la fenêtre
  window.addEventListener('resize', checkScreenSize);
};

//Apply margin at HUB GALERY
export function applyMarginToHubGalerie() {
  const cards = document.querySelectorAll('.hub_galerie_card');

  // Applies a margin-top of 2.5rem to every second element
  cards.forEach((card, index) => {
    if (index % 2 === 0) {
      (card as HTMLElement).style.marginTop = '2.5rem';
    }
  });
}
