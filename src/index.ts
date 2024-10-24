import './index.css';

import { catalogueFilterCount, updateCatalogueCount } from '$utils/catalogue/catalogueCount';
import { catalogueCat } from '$utils/catalogue/catalogueFilter';
import { fixCatalogueCategoriesText } from '$utils/catalogue/catalogueQuickFix';
import { hideEmptyLabelsContainer } from '$utils/catalogue/catalogueQuickFix';
import { formInputLabels } from '$utils/contact/formInput';
import { showSiret } from '$utils/contact/formInput';
import { loadScript } from '$utils/global/loadScript';
import {
  swiperBlogAutres,
  swiperChronologie,
  swiperHpPicture,
  swiperHpTestimonial,
  swiperProduitsAutres,
  swiperProduitsCarousel,
} from '$utils/global/swiper';
import { initializeMap } from '$utils/map/map';

window.Webflow ||= [];
window.Webflow.push(() => {
  /* global */
  Promise.all([
    loadScript(
      'https://cdn.jsdelivr.net/npm/@finsweet/attributes-scrolldisable@1/scrolldisable.js'
    ),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsload@1/cmsload.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-selectcustom@1/selectcustom.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-accordion@1/accordion.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsstatic@1/cmsstatic.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-inputactive@1/inputactive.js'),
    setTimeout(() => {
      loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsfilter@1/cmsfilter.js');
    }, 250),
  ]);

  swiperHpPicture();
  swiperHpTestimonial();
  swiperBlogAutres();
  swiperChronologie();

  /* map */
  initializeMap();

  /* contact form */
  formInputLabels();

  /* Catalogue */
  if (window.location.pathname === '/catalogue') {
    catalogueCat();
    updateCatalogueCount();
    fixCatalogueCategoriesText();
    setTimeout(() => {
      catalogueFilterCount();
      hideEmptyLabelsContainer();
    }, 3500);
  }

  if (window.location.pathname.startsWith('/catalogue-produit')) {
    swiperProduitsAutres();
    swiperProduitsCarousel();
  }

  if (window.location.pathname === '/contact') {
    showSiret();
  }
});
