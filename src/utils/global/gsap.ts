import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const setupBlogCardHoverEffect = (): void => {
  // Sélectionne toutes les cartes avec la classe '.hp_blog_small-card'
  const cards = document.querySelectorAll('.hp_blog_small-card');

  cards.forEach((card) => {
    const frontImage = card.querySelector('.hp_blog_sc-img-front');
    const hoverImage = card.querySelector('.hp_blog_sc-img-hover');

    if (frontImage && hoverImage) {
      // Au survol de la carte
      card.addEventListener('mouseenter', () => {
        gsap.to(frontImage, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        gsap.to(hoverImage, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      });

      // Lorsque la souris quitte la carte
      card.addEventListener('mouseleave', () => {
        gsap.to(frontImage, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(hoverImage, { opacity: 0, duration: 0.3, ease: 'power2.out' });
      });
    }
  });
};
