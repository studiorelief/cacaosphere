import 'swiper/css/bundle';

// @ts-expect-error : swiper bundle root
import Swiper from 'swiper/bundle';

export function swiperHpPicture() {
  new Swiper('.swiper.is-hp-slider-picture', {
    direction: 'horizontal',
    slidesPerView: 1,
    speed: 400,
    loop: true,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: '.hp-slider-picture_button-next',
      prevEl: '.hp-slider-picture_button-prev',
    },
  });
}

export function swiperHpTestimonial() {
  new Swiper('.swiper.is-hp-testimonials', {
    direction: 'horizontal',
    slidesPerView: 2,
    spaceBetween: 80,
    speed: 400,
    loop: true,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev',
    },
  });
}

export function swiperProduitsCarousel() {
  new Swiper('.swiper.is-produit-hero-caroussel', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 32,
    speed: 400,
    effect: 'fade',
    mousewheel: {
      forceToAxis: true,
    },
    // navigation: {
    //   nextEl: '.swiper-btn-next',
    //   prevEl: '.swiper-btn-prev',
    // },
  });
}

export function swiperProduitsAutres() {
  new Swiper('.swiper.is-m-categorie', {
    direction: 'horizontal',
    slidesPerView: 3,
    spaceBetween: 32,
    speed: 400,
    loop: true,
    effect: 'slide',
    mousewheel: {
      forceToAxis: true,
    },
    // navigation: {
    //   nextEl: '.swiper-btn-next',
    //   prevEl: '.swiper-btn-prev',
    // },
  });
}
