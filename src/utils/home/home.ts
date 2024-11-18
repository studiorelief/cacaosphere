import { gsap } from 'gsap';

// Hover on Hub card
export const ressourcesHover = (): void => {
  const cards = document.querySelectorAll('.hp_ressources_small-card');

  // Applies hover and mouseleave animations to each card
  cards.forEach((card) => {
    const textContent = card.querySelector<HTMLElement>('.hp_ressources_sc_text-content');

    // Checks if the text element exists before continuing
    if (textContent) {
      // Set hover animation
      card.addEventListener('mouseenter', () => {
        gsap.to(textContent, {
          top: '0rem', /// Final Position hover
          backgroundColor: 'rgba(90, 31, 27, 0.8)', // background with 80% opacity
          duration: 0.5,
          ease: 'power3.out',
        });
      });

      // Sets the animation for the mouseleave
      card.addEventListener('mouseleave', () => {
        gsap.to(textContent, {
          top: '19rem', // Initial position at mouseleave
          backgroundColor: 'transparent', // Initial background-color
          duration: 0.5,
          ease: 'power3.out',
        });
      });
    }
  });
};

// Fonction pour les grandes cartes
export function initTerroirsHover(): void {
  const cards = document.querySelectorAll('.hp_terroirs_big-card');

  cards.forEach((card) => {
    card.addEventListener('mouseenter', (e) => {
      const title = (e.currentTarget as HTMLElement).querySelector(
        '.hp_terroirs_bc-text-content'
      ) as HTMLElement;
      const hoverContent = (e.currentTarget as HTMLElement).querySelector(
        '.hp_terroirs_bc-hover-content'
      ) as HTMLElement;

      if (title) {
        title.style.transform = 'translateY(-6rem)';
        title.style.transition = 'transform 0.3s ease-out';
      }

      if (hoverContent) {
        hoverContent.style.opacity = '1';
        hoverContent.style.transition = 'opacity 0.3s ease-out';
      }
    });

    card.addEventListener('mouseleave', (e) => {
      const title = (e.currentTarget as HTMLElement).querySelector(
        '.hp_terroirs_bc-text-content'
      ) as HTMLElement;
      const hoverContent = (e.currentTarget as HTMLElement).querySelector(
        '.hp_terroirs_bc-hover-content'
      ) as HTMLElement;

      if (title) {
        title.style.transform = 'translateY(0)';
        title.style.transition = 'transform 0.3s ease-out';
      }

      if (hoverContent) {
        hoverContent.style.opacity = '0';
        hoverContent.style.transition = 'opacity 0.3s ease-out';
      }
    });
  });
}

// Nouvelle fonction pour les petites cartes
export function initSmallTerroirsHover(): void {
  const smallCards = document.querySelectorAll('.hp_terroirs_small-card');

  smallCards.forEach((card) => {
    card.addEventListener('mouseenter', (e) => {
      const textContent = (e.currentTarget as HTMLElement).querySelector(
        '.hp_terroirs_sc-text-content'
      ) as HTMLElement;
      const hoverContent = (e.currentTarget as HTMLElement).querySelector(
        '.hp_terroirs_bc-hover-content'
      ) as HTMLElement;

      if (textContent) {
        textContent.style.transform = 'translateY(-2rem)';
        textContent.style.transition = 'transform 0.3s ease-out';
      }

      if (hoverContent) {
        hoverContent.style.opacity = '1';
        hoverContent.style.transition = 'opacity 0.3s ease-out';
      }
    });

    card.addEventListener('mouseleave', (e) => {
      const textContent = (e.currentTarget as HTMLElement).querySelector(
        '.hp_terroirs_sc-text-content'
      ) as HTMLElement;
      const hoverContent = (e.currentTarget as HTMLElement).querySelector(
        '.hp_terroirs_bc-hover-content'
      ) as HTMLElement;

      if (textContent) {
        textContent.style.transform = 'translateY(0)';
        textContent.style.transition = 'transform 0.3s ease-out';
      }

      if (hoverContent) {
        hoverContent.style.opacity = '0';
        hoverContent.style.transition = 'opacity 0.3s ease-out';
      }
    });
  });
}

export function initProductsHover(): void {
  document.querySelectorAll('.hp_products_card').forEach((card) => {
    const handleHover = (isEntering: boolean) => {
      const selectors = {
        overlay: '.hp_products_card-overlay',
        description: '.hp_products_card-text-description',
        link: '.hp_products_card-link',
        title: '.hp_products_card-title',
      };

      Object.entries(selectors).forEach(([key, selector]) => {
        const element = card.querySelector(selector) as HTMLElement;
        if (!element) return;

        type StylesType = {
          opacity?: string;
          transition: string;
          transform?: string;
        };

        // Styles de base
        const baseStyles: StylesType = {
          transition: 'all 0.3s ease-out',
        };

        // Ajouter opacity pour tous sauf le titre
        if (key !== 'title') {
          baseStyles.opacity = isEntering ? '1' : '0';
        }

        // Ajouter transform uniquement pour le titre
        if (key === 'title') {
          baseStyles.transform = `translateY(${isEntering ? '-0.2rem' : '0'})`;
        }

        Object.assign(element.style, baseStyles);

        // Gestion spéciale pour description et link
        if (key === 'description' || key === 'link') {
          element.style.display = isEntering ? 'block' : 'none';
        }
      });
    };

    card.addEventListener('mouseenter', () => handleHover(true));
    card.addEventListener('mouseleave', () => handleHover(false));
  });
}
