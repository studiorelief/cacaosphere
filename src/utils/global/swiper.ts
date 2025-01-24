import 'swiper/css/bundle';

// @ts-expect-error : swiper bundle root
import Swiper from 'swiper/bundle';

export function swiperHpPicture() {
  const swiperElement = document.querySelector('.swiper.is-slider-picture');
  if (!swiperElement) return;

  return new Swiper('.swiper.is-slider-picture', {
    direction: 'horizontal',
    slidesPerView: 1,
    speed: 800,
    loop: true,
    navigation: {
      nextEl: '.slider-picture_button-next',
      prevEl: '.slider-picture_button-prev',
    },
  });
}

export function swiperHpTestimonial() {
  new Swiper('.swiper.is-hp-testimonials', {
    direction: 'horizontal',
    slidesPerView: 1,
    centerSlide: true,
    spaceBetween: 80, // Valeur de base en pixels
    autoHeight: true,
    speed: 600,
    loop: true,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: '.hp_testimonials_btn-next',
      prevEl: '.hp_testimonials_btn-prev',
    },
    breakpoints: {
      // mobile - < 480px
      0: {
        slidesPerView: 1,
        spaceBetween: 80,
      },
      // >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 80,
      },
    },
  });
}

export function swiperBlogAutres() {
  new Swiper('.swiper.is-blog', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 3.5 * 16,
    speed: 400,
    loop: true,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: '.hp_blog_btn-next',
      prevEl: '.hp_blog_btn-prev',
    },
    pagination: {
      el: '.coop_hero_pagination.is-hp',
      clickable: true,
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
    },
    breakpoints: {
      // When the screen width is greater than 480px
      480: {
        slidesPerView: 2,
      },
      // When the screen width is greater than 480px
      1200: {
        slidesPerView: 3,
      },
    },
  });
}

export function swiperProduitsCarousel() {
  new Swiper('.swiper.is-produit-hero-caroussel', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 32,
    speed: 400,
    loop: true,
    effect: 'fade',
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: '.produit_hero_swiper-btn-next',
      prevEl: '.produit_hero_swiper-btn-prev',
    },
  });
}

export function swiperProduitsAutres() {
  new Swiper('.swiper.is-m-categorie', {
    direction: 'horizontal',
    slidesPerView: 3,
    spaceBetween: 32,
    speed: 400,
    loop: false,
    effect: 'slide',
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: '.produit_m-categorie_swiper-btn-prev',
      prevEl: '.produit_m-categorie_swiper-btn-next',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      568: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
      991: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
    },
  });
}

export function swiperChronologie() {
  new Swiper('.swiper.is-chronologie', {
    direction: 'horizontal',
    slidesPerView: 5,
    spaceBetween: 3.5 * 16,
    speed: 400,
    loop: false,
    mousewheel: {
      forceToAxis: true,
    },

    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
      reverseDirection: false,
    },
    navigation: {
      nextEl: '.a-propos_chronologie_navigation.is-right',
      prevEl: '.a-propos_chronologie_navigation.is-left',
    },
    breakpoints: {
      320: {
        slidesPerView: 1.5,
        spaceBetween: 16,
      },
      568: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
    },
  });
}

export function swiperCoopHero() {
  new Swiper('.swiper.is-coop-hero', {
    direction: 'horizontal',
    slidesPerView: 1,
    autoplay: {
      delay: 3000, // Ajouter un délai
      disableOnInteraction: false, // Continuer l'autoplay après interaction
    },
    speed: 400,
    loop: true,
    navigation: {
      nextEl: '.coop_hero_button.is-next',
      prevEl: '.coop_hero_button.is-prev',
    },
    pagination: {
      el: '.coop_hero_pagination',
      clickable: true,
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
    },
  });
}

export function swiperLastPosts() {
  new Swiper('.swiper.is-post', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 16,
    autoplay: {
      delay: 3000, // Ajouter un délai
      disableOnInteraction: false, // Continuer l'autoplay après interaction
    },
    speed: 400,
    loop: true,
    navigation: {
      nextEl: '.hp_testimonials_btn-next',
      prevEl: '.hp_testimonials_btn-prev',
    },
    pagination: {
      el: '.article_last-posts_pagination',
      clickable: true,
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
    },
    breakpoints: {
      // When the screen width is greater than 500px
      500: {
        slidesPerView: 2,
        /*centerSlide: true,
        spaceBetween: 5 * 16,*/
      },
      750: {
        slidesPerView: 3,
        /*centerSlide: true,
        spaceBetween: 5 * 16,*/
      },
      1300: {
        slidesPerView: 4,
        /*centerSlide: true,
        spaceBetween: 5 * 16,*/
      },
    },
  });
}

/* produits */
export function swiperCoopProduct() {
  const swiperElement = document.querySelector('.swiper.is-slider-coop');

  if (swiperElement) {
    new Swiper('.swiper.is-slider-coop', {
      direction: 'horizontal',
      slidesPerView: 1,
      speed: 400,
      loop: true,
      autoHeight: true,
      // mousewheel: {
      //   forceToAxis: true,
      // },
      navigation: {
        nextEl: '.slider-coop_button-next',
        prevEl: '.slider-coop_button-prev',
      },
    });
  }
}

/* Testimonial Hub - Mobile */
export function swiperHubMobile(selector: string, paginationSelector: string) {
  new Swiper(selector, {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 30,
    /*spaceBetween: 24,*/
    speed: 400,
    loop: true,
    pagination: {
      /*el: `${selector} .swiper-pagination`, // Utilise le sélecteur pour la pagination*/
      el: paginationSelector,
      clickable: true,
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
    },
  });
}
