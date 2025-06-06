import './index.css';

import { removeStaticListAProposMobile } from '$utils/a-propos/staticItem';
import {
  catalogueCalcFilterNumber,
  /* , updateCatalogueCount */ catalogueFilterCount,
} from '$utils/catalogue/catalogueCount';
import { catalogueCat } from '$utils/catalogue/catalogueFilter';
// import { catalogueLoader } from '$utils/catalogue/catalogueLoader';
import { catalogueOpenFilter } from '$utils/catalogue/catalogueMobile';
import {
  fixCatalogueCategoriesText,
  hideEmptyLabelsContainer,
} from '$utils/catalogue/catalogueQuickFix';
import { formInputLabels, showSiret } from '$utils/contact/formInput';
import { filterCooperativesByCountry, initDynamicCoopLinks } from '$utils/coop/coop';
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
import { hideSectionIfCmsEmpty } from '$utils/global/tricks';
import { heroVideoScale } from '$utils/home/hero';
import {
  initProductsHover,
  initSmallTerroirsHover,
  initTerroirsHover,
  ressourcesHover,
} from '$utils/home/home';
import { catalogueCategoriesTrad } from '$utils/localization/catalogueCategoriesTrad';
import { initializeMap } from '$utils/map/map';
import { catalogueArianeCatLink } from '$utils/produits/catalogueArianeCatLink';
import { catalogueFormTrigger } from '$utils/produits/catalogueFormTrigger';
import { catalogueSameCat } from '$utils/produits/catalogueSameCat';
import { hideEmptyWrapper } from '$utils/produits/produitQuickFix';
import {
  animateBigCardRessource,
  animateLastNewsCard,
  animateSmallCardRessource,
  animateSpecialSelectCard,
  blogMenuVisibility,
  handleGuideFilter,
  initBlogSections,
  initCmsFilter,
  initSocialShare,
  initTocScript,
  mirrorBlogSearch,
  searchBarPlaceholderStyling,
  setBlogMenuFilters,
} from '$utils/ressources/blog';
import {
  checkAndHideEmptyCategories,
  initFaqScroll,
  linkFaqCategoryAnimations,
  mirrorFaqSearch,
  toggleFaqEmptyVisibility,
} from '$utils/ressources/faq';
import {
  hoverOnDownloadCard,
  hoverOnGalerieCard,
  hoverOnVideoBigCard,
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

  //coop
  swiperCoopHero();

  // Hub
  swiperHubMobile('.swiper.is-mobile-hub-page.is-testimonial', '.coop_hero_pagination.is-testi');
  swiperHubMobile('.swiper.is-mobile-hub-page.is-guide', '.coop_hero_pagination.is-guide');
  swiperHubMobile('.swiper.is-mobile-hub-page.is-action', '.coop_hero_pagination.is-action');
  swiperHubMobile('.swiper.is-mobile-hub-page.is-download', '.coop_hero_pagination.is-download');
  swiperHubMobile('.swiper.is-mobile-hub-page.is-galerie', '.coop_hero_pagination.is-galerie');

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

  if (window.location.pathname.includes('/a-propos')) {
    removeStaticListAProposMobile();
  }

  /* homepage */
  if (window.location.pathname === '/fr' || window.location.pathname === '/en') {
    ressourcesHover();
    initTerroirsHover();
    initSmallTerroirsHover();
    initProductsHover();
    hoverOnDownloadCard();
    hoverOnGalerieCard();
    heroVideoScale();
    hoverOnVideoBigCard();
  }

  /* tricks */
  hideSectionIfCmsEmpty();
  hideEmptyWrapper();

  /* map */
  if (window.location.href.includes('/terroir-cacao')) {
    initializeMap();
  }

  /* Coopératives */
  if (window.location.pathname.includes('/cooperatives')) {
    filterCooperativesByCountry();
    /*initCoopFilterLinks();*/
    initDynamicCoopLinks();
  }

  /* hub */
  if (window.location.href.includes('hub') || window.location.href.includes('nos-ressources')) {
    hoverOnVideoCard();
    showContentTestimonialCard();
    hoverOnGalerieCard();
    hoverOnDownloadCard();
    // Fusion des appels showMoreItems
    ['testimonial', 'galerie', 'download', 'action'].forEach((type) =>
      showMoreItems(type as 'testimonial' | 'galerie' | 'download' | 'action')
    );
  }

  /* faq */
  if (window.location.href.includes('faq')) {
    /*filterFAQCategories();*/
    mirrorFaqSearch();
    linkFaqCategoryAnimations();
    initFaqScroll();
    checkAndHideEmptyCategories();
    toggleFaqEmptyVisibility();
  }

  /* blog */
  initBlogSections();
  mirrorBlogSearch();
  searchBarPlaceholderStyling();
  handleGuideFilter();
  swiperLastPosts();
  initTocScript();
  initSocialShare();
  initCmsFilter();

  // Vérification du pathname uniquement pour les fonctions qui en ont besoin
  if (window.location.pathname.includes('/fr/techniques-pour-professionnel/blog')) {
    setBlogMenuFilters('fr');
    blogMenuVisibility();
  } else if (window.location.pathname.includes('/en/techniques-pour-professionnel/blog')) {
    setBlogMenuFilters('en');
    blogMenuVisibility();
  }

  /* contact form */
  formInputLabels();

  /* Catalogue */
  if (window.location.pathname.includes('/nos-produits')) {
    // main category logic

    catalogueCat();
    catalogueCalcFilterNumber();

    // mobile filter
    if (window.innerWidth < 991) {
      catalogueOpenFilter();
    }

    // quick fix
    fixCatalogueCategoriesText();
    hideEmptyLabelsContainer();

    // filter system
    setTimeout(() => {
      catalogueFilterCount();
      // updateCatalogueCount();
      // if (window.innerWidth > 991) {
      //   catalogueLoader();
      // }
    }, 3500);
  }

  /* Fiche produit */
  if (window.location.pathname.includes('/nos-produits')) {
    /*
    TODO: recheck this logic -> remove setTimeout
    ?: Local code break on other pages than noir 65 -> alert for checking -> Trouver la source -> Sûrement swiper & nb item mais pourquoi ?
    * DONE - 13.11.24
    */

    catalogueSameCat();
    catalogueArianeCatLink();

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

    //Product mobile slider -> Keep this at the end of the script to avoid product page error
    if (window.innerWidth < 991) {
      swiperHubMobile(
        '.swiper.is-mobile-product-page.is-ressources',
        '.coop_hero_pagination.is-ressources.is-product-page'
      );
    }
  }

  //Blog -> Keep this at the end of the script to avoid product page error
  if (document.querySelector('.swiper.is-blog')) {
    swiperBlogAutres();
  }

  /* A propos */
  if (window.location.pathname.includes('/a-propos')) {
    removeStaticListAProposMobile();
  }

  if (window.location.pathname.includes('/contact')) {
    showSiret();
  }
});
