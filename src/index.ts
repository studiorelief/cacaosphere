import './index.css';

import { catalogueFilterCount /* , updateCatalogueCount */ } from '$utils/catalogue/catalogueCount';
import { catalogueCat } from '$utils/catalogue/catalogueFilter';
// import { catalogueLoader } from '$utils/catalogue/catalogueLoader';
import { catalogueOpenFilter } from '$utils/catalogue/catalogueMobile';
import {
  fixCatalogueCategoriesText,
  hideEmptyLabelsContainer,
} from '$utils/catalogue/catalogueQuickFix';
import { formInputLabels, showSiret } from '$utils/contact/formInput';
import { loadScript } from '$utils/global/loadScript';
import { navScroll, setCurrentDropdownState, setCurrentRowFromURL } from '$utils/global/navbar';
import {
  swiperBlogAutres,
  swiperChronologie,
  swiperCoopHero,
  swiperCoopProduct,
  swiperHpPicture,
  swiperHpTestimonial,
  swiperHubMobile,
  swiperLastPosts,
  swiperProduitsAutres,
  swiperProduitsCarousel,
} from '$utils/global/swiper';
import { hideSectionIfCmsEmpty, removeStaticListAProposMobile } from '$utils/global/tricks';
import { heroVideoScale } from '$utils/home/hero';
import {
  initProductsHover,
  initSmallTerroirsHover,
  initTerroirsHover,
  ressourcesHover,
} from '$utils/home/home';
import { catalogueCategoriesTrad } from '$utils/localization/catalogueCategoriesTrad';
import { initializeMap } from '$utils/map/map';
import { catalogueFormTrigger } from '$utils/produits/catalogueFormTrigger';
import { catalogueSameCat } from '$utils/produits/catalogueSameCat';
import { hideEmptyWrapper } from '$utils/produits/produitQuickFix';
import {
  animateBigCardRessource,
  animateLastNewsCard,
  animateSmallCardRessource,
  animateSpecialSelectCard,
  blogMenuVisibility,
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
  applyMarginToHubGalerie,
  hoverOnDownloadCard,
  hoverOnGalerieCard,
  hoverOnVideoCard,
  showContentTestimonialCard,
  showMoreItems,
} from '$utils/ressources/hub';

window.Webflow ||= [];
window.Webflow.push(() => {
  /* global */
  Promise.all([
    // window.innerWidth < 991 &&
    //   loadScript(
    //     'https://cdn.jsdelivr.net/npm/@finsweet/attributes-scrolldisable@1/scrolldisable.js'
    //   ),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsload@1/cmsload.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsnest@1/cmsnest.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-selectcustom@1/selectcustom.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-accordion@1/accordion.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsstatic@1/cmsstatic.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-inputactive@1/inputactive.js'),
    setTimeout(() => {
      loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsfilter@1/cmsfilter.js');
    }, 500),
  ]);

  /* navbar */
  if (window.innerWidth > 992) {
    navScroll();
    setCurrentDropdownState();
    setCurrentRowFromURL();
  }
  /* swiper */
  swiperChronologie();

  //Home
  swiperHpPicture();
  swiperHpTestimonial();

  //Blog
  swiperBlogAutres();

  //coop
  swiperCoopHero();

  // Hub
  swiperHubMobile('.swiper.is-mobile-hub-page.is-testimonial', '.coop_hero_pagination.is-testi');
  swiperHubMobile('.swiper.is-mobile-hub-page.is-guide', '.coop_hero_pagination.is-guide');
  swiperHubMobile('.swiper.is-mobile-hub-page.is-action', '.coop_hero_pagination.is-action');
  swiperHubMobile('.swiper.is-mobile-hub-page.is-download', '.coop_hero_pagination.is-download');

  //Product
  swiperHubMobile(
    '.swiper.is-mobile-product-page.is-ressources',
    '.coop_hero_pagination.is-ressources.is-product-page'
  );

  /* gsap */
  animateBigCardRessource();
  animateSmallCardRessource();
  animateLastNewsCard();
  animateSpecialSelectCard();

  /* Localization */
  catalogueCategoriesTrad();

  /* cache 
  -> produit to contact form
  */
  catalogueFormTrigger();

  /* homepage */
  if (window.location.pathname === '/fr' || window.location.pathname === '/en') {
    ressourcesHover();
    initTerroirsHover();
    initSmallTerroirsHover();
    initProductsHover();
    hoverOnVideoCard();
    hoverOnDownloadCard();
    hoverOnGalerieCard();
    heroVideoScale();
  }

  /* tricks */
  hideSectionIfCmsEmpty();
  hideEmptyWrapper();

  /* map */
  if (window.location.href.includes('cooperatives')) {
    initializeMap();
  }

  /* hub */
  if (window.location.href.includes('hub')) {
    hoverOnVideoCard();
    showContentTestimonialCard();
    hoverOnGalerieCard();
    applyMarginToHubGalerie();
    hoverOnDownloadCard();
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
  if (window.location.pathname.includes('/blog')) {
    blogMenuVisibility();
  }

  /* contact form */
  formInputLabels();

  /* Catalogue */
  if (window.location.pathname === '/catalogue') {
    // main category logic

    catalogueCat();

    // mobile filter
    if (window.innerWidth < 991) {
      catalogueOpenFilter();
    }

    // quick fix
    fixCatalogueCategoriesText();
    hideEmptyLabelsContainer();

    // filter system
    /*
    TODO: réduire le load jQuery des nested collection 
    TODO: setTimout ne marche pas toujours -> Souvent au second load -> Prévoir pass - Check le setTimout du script attribut en // 
    */
    setTimeout(() => {
      catalogueFilterCount();
      // updateCatalogueCount();
      // if (window.innerWidth > 991) {
      //   catalogueLoader();
      // }
    }, 3500);
  }

  if (
    window.location.pathname.startsWith('/fr/catalogue-produit') ||
    window.location.pathname.startsWith('/en/catalogue-produit')
  ) {
    /*
    TODO: recheck this logic -> remove setTimeout
    ?: Local code break on other pages than noir 65 -> alert for checking -> Trouver la source -> Sûrement swiper & nb item mais pourquoi ?
    * DONE - 13.11.24
    */

    catalogueSameCat();
    if (
      (document.querySelector('.section_produit_slider-coop') as HTMLElement).style.display !==
      'none'
    ) {
      swiperCoopProduct();
    }
    swiperProduitsAutres();
    swiperProduitsCarousel();
    fixCatalogueCategoriesText();
    hideEmptyLabelsContainer();

    // animation ressources
    ressourcesHover();
    initTerroirsHover();
    initSmallTerroirsHover();
    initProductsHover();
    hoverOnGalerieCard();
    hoverOnVideoCard();
    hoverOnDownloadCard();
    heroVideoScale();
  }

  /* A propos */
  if (window.location.pathname === '/a-propos') {
    removeStaticListAProposMobile();
  }

  if (window.location.pathname === '/contact') {
    showSiret();
  }
});
