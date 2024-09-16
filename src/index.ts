import './index.css';

import { swiperHpPicture, swiperHpTestimonial } from '$utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  swiperHpPicture();
  swiperHpTestimonial();
});
