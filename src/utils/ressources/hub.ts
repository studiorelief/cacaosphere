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
  if (!cards.length) return;

  const handleHover = (event: Event, isEnter: boolean) => {
    const target = event.currentTarget as HTMLElement;
    const overlay = target.querySelector('.hub_action_overlay') as HTMLElement;
    const textContent = target.querySelector('.hub_action_text-content') as HTMLElement;

    if (!overlay || !textContent) return;

    // Animation de l'overlay
    overlay.style.opacity = isEnter ? '1' : '0';
    overlay.style.backgroundColor = isEnter ? 'rgba(90, 31, 27, 0.8)' : 'initial';

    gsap.to(textContent, {
      duration: 0.3,
      ease: 'power3.out',
      top: isEnter ? '18rem' : '25rem',
    });
  };

  // Gestion des événements sur desktop uniquement
  if (window.innerWidth > 991) {
    cards.forEach((card) => {
      card.addEventListener('mouseenter', (e) => handleHover(e, true));
      card.addEventListener('mouseleave', (e) => handleHover(e, false));
    });
  }
}

export const hoverOnGalerieCard = (): void => {
  const cards = document.querySelectorAll('.hub_galerie_card');

  // Vérifier d'abord si l'écran est assez large
  if (window.innerWidth <= 767) return;

  cards.forEach((card) => {
    const textContent = card.querySelector<HTMLElement>('.hub_galerie_text-content');

    if (textContent) {
      const isHome =
        card.classList.contains('is-home') && textContent.classList.contains('is-home');

      card.addEventListener('mouseenter', () => {
        gsap.to(textContent, {
          top: '0rem',
          backgroundColor: 'rgba(90, 31, 27, 0.8)',
          duration: 0.5,
          ease: 'power3.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        const screenWidth = window.innerWidth;

        // Ajuster les positions en fonction de la taille d'écran
        let initialTop = screenWidth < 480 ? '6.9rem' : '15rem';
        if (isHome) {
          initialTop = '18.2rem';
        }

        gsap.to(textContent, {
          top: initialTop,
          backgroundColor: 'transparent',
          duration: 0.5,
          ease: 'power3.out',
        });
      });

      // Position initiale
      const screenWidth = window.innerWidth;
      const initialTop = isHome ? '18.2rem' : screenWidth < 480 ? '6.9rem' : '15rem';
      textContent.style.top = initialTop;
    }
  });

  // Optionnel : gérer le redimensionnement de la fenêtre
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 767) {
      // Réinitialiser les styles si nécessaire
      cards.forEach((card) => {
        const textContent = card.querySelector<HTMLElement>('.hub_galerie_text-content');
        if (textContent) {
          textContent.style.backgroundColor = 'transparent';
          const isHome = card.classList.contains('is-home');
          textContent.style.top = isHome ? '18.2rem' : '6.9rem';
        }
      });
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
        top: '16rem', // Initial position at mouseleave
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

export function hoverOnVideoBigCard() {
  const cards = document.querySelectorAll('.hub_action_card.is-home');
  if (!cards.length) return;

  const handleHover = (event: Event, isEnter: boolean) => {
    const target = event.currentTarget as HTMLElement;
    const overlay = target.querySelector('.hub_action_overlay') as HTMLElement;
    const textContent = target.querySelector('.hub_action_text-content.is-home') as HTMLElement;

    if (!overlay || !textContent) return;

    // Animation de l'overlay
    overlay.style.opacity = isEnter ? '1' : '0';
    overlay.style.backgroundColor = isEnter ? 'rgba(90, 31, 27, 0.8)' : 'initial';

    // Animation du texte
    gsap.to(textContent, {
      duration: 0.5, // Augmentez la durée pour une animation plus fluide
      top: isEnter ? '0' : 'auto', // Utilisez uniquement 'top' ou 'bottom', pas les deux
      ease: 'power3.out',
    });
  };

  // Gestion des événements sur desktop uniquement
  if (window.innerWidth > 991) {
    cards.forEach((card) => {
      card.addEventListener('mouseenter', (e) => handleHover(e, true));
      card.addEventListener('mouseleave', (e) => handleHover(e, false));
    });
  }
}
