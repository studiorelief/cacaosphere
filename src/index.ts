import './index.css';

import { catalogueFilterCount, updateCatalogueCount } from '$utils/catalogue/catalogueCount';
import { catalogueCat } from '$utils/catalogue/catalogueFilter';
import { catalogueLoader } from '$utils/catalogue/catalogueLoader';
import { fixCatalogueCategoriesText } from '$utils/catalogue/catalogueQuickFix';
import { hideEmptyLabelsContainer } from '$utils/catalogue/catalogueQuickFix';
import { formInputLabels } from '$utils/contact/formInput';
import { showSiret } from '$utils/contact/formInput';
import { loadScript } from '$utils/global/loadScript';
import { navScroll, setCurrentDropdownState, setCurrentRowFromURL } from '$utils/global/navbar';
import {
  swiperBlogAutres,
  swiperChronologie,
  swiperCoopHero,
  swiperHpPicture,
  swiperHpTestimonial,
  swiperLastPosts,
  swiperProduitsAutres,
  swiperProduitsCarousel,
} from '$utils/global/swiper';
import {
  initProductsHover,
  initSmallTerroirsHover,
  initTerroirsHover,
  ressourcesHover,
} from '$utils/home/home';
import { initializeMap } from '$utils/map/map';
import { catalogueFormTrigger } from '$utils/produits/catalogueFormTrigger';
import { catalogueSameCat } from '$utils/produits/catalogueSameCat';
import {
  animateBigCardRessource,
  animateLastNewsCard,
  animateSmallCardRessource,
  animateSpecialSelectCard,
  checkURLParameter,
  handleGuideFilter,
  initBlogSections,
  mirrorBlogSearch,
  observeTocLinks,
  searchBarPlaceholderStyling,
} from '$utils/ressources/blog';
import {
  filterFAQCategories,
  linkFaqCategoryAnimations,
  mirrorFaqSearch,
} from '$utils/ressources/faq';
import {
  animateDownloadCardHover,
  animateHubGalerieCardHover,
  applyMarginToHubGalerie,
  hoverOnActionCard,
  showContentTestimonialCard,
  showMoreItems,
} from '$utils/ressources/hub';

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

  /* navbar */
  if (window.innerWidth > 992) {
    navScroll();
    setCurrentDropdownState();
    setCurrentRowFromURL();
  }

  swiperHpPicture();
  swiperHpTestimonial();
  swiperBlogAutres();
  swiperChronologie();
  swiperCoopHero();

  /* gsap */
  animateBigCardRessource();
  animateSmallCardRessource();
  animateLastNewsCard();
  animateSpecialSelectCard();

  /* cache 
  -> produit to contact form
  */
  catalogueFormTrigger();

  /* homepage */
  if (window.location.pathname === '/') {
    ressourcesHover();
    initTerroirsHover();
    initSmallTerroirsHover();
    initProductsHover();
  }

  /* map */
  if (window.location.href.includes('cooperatives')) {
    initializeMap();
  }

  /* hub */
  if (window.location.href.includes('hub')) {
    hoverOnActionCard();
    showContentTestimonialCard();
    animateHubGalerieCardHover();
    applyMarginToHubGalerie();
    animateDownloadCardHover();
    // Fusion des appels showMoreItems
    ['testimonial', 'galerie', 'download', 'action'].forEach((type) =>
      showMoreItems(type as 'testimonial' | 'galerie' | 'download' | 'action')
    );
  }

  /* faq */
  if (window.location.href.includes('faq')) {
    filterFAQCategories();
    mirrorFaqSearch();
    linkFaqCategoryAnimations();
  }

  /* blog */
  initBlogSections();
  mirrorBlogSearch();
  checkURLParameter();
  searchBarPlaceholderStyling();
  handleGuideFilter();
  swiperLastPosts();
  observeTocLinks();

  /* contact form */
  formInputLabels();

  /* Catalogue */
  if (window.location.pathname === '/catalogue') {
    // main category logic
    catalogueCat();
    // quick fix
    fixCatalogueCategoriesText();
    hideEmptyLabelsContainer();
    // filter system
    /*
    TODO: réduire le load jQuery des nested collection 
    */
    // Wait for jQuery to load nested collections
    const loadPromise = new Promise((resolve) => {
      setTimeout(resolve, 3500);
    });

    loadPromise.then(() => {
      catalogueFilterCount();
      updateCatalogueCount();
      catalogueLoader();
    });
    // setTimeout(() => {
    //   catalogueFilterCount();
    //   updateCatalogueCount();
    //   catalogueLoader();
    // }, 3500);
  }

  if (window.location.pathname.startsWith('/catalogue-produit')) {
    /*
    TODO: recheck this logic -> remove setTimeout
    ?: Local code break on other pages than noir 65 -> alert for checking -> Trouver la source -> Sûrement swiper & nb item mais pourquoi ?
    */

    catalogueSameCat();
    // alert('test');
    // OK
    swiperProduitsAutres();
    swiperProduitsCarousel();
    fixCatalogueCategoriesText();
    hideEmptyLabelsContainer();
  }

  if (window.location.pathname === '/contact') {
    showSiret();
  }
});
