import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export function swiperHpPicture() {
  new Swiper('.hp-slider-picture-swiper', {
    modules: [Navigation],
    direction: 'horizontal',
    slidesPerView: 1,
    speed: 1200,
    loop: true,
    navigation: {
      nextEl: '.hp-slider-picture-button-next',
      prevEl: '.hp-slider-picture-button-prev',
    },
  });
}

export function swiperHpTestimonial() {
  new Swiper('.swiper', {
    modules: [Navigation],
    direction: 'horizontal',
    slidesPerView: 2,
    spaceBetween: 300,
    speed: 2000,
    loop: true,
    navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev',
    },
  });
}
