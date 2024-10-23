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

export function swiperBlogAutres() {
  new Swiper('.swiper.is-blog', {
    direction: 'horizontal',
    slidesPerView: 3,
    spaceBetween: 3.5 * 16,
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
  });
}
