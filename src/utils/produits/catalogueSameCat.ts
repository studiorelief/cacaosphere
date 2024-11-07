export function catalogueSameCat() {
  // Get the main category section and its ID
  const mainCategorySection = document.querySelector('.section_produit_m-categorie');
  const categoryId = mainCategorySection?.getAttribute('id');

  if (categoryId) {
    // Get all swiper slides
    const swiperSlides = document.querySelectorAll('.swiper-slide.is-m-categorie');

    // Check each slide
    swiperSlides.forEach((slide) => {
      const slideEl = slide as HTMLElement;
      const displayAttr = slide.getAttribute('display');

      // Show slide if display attribute matches category ID, hide otherwise
      if (displayAttr === categoryId) {
        slideEl.style.display = 'block';
      } else {
        slideEl.style.display = 'none';
      }
    });
  }
}
