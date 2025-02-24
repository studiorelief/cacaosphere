import mapboxgl from 'mapbox-gl';

import MapboxService from '../../services/mapbox.service';

// Get Mapbox instance and set access token
const mapboxService = MapboxService.getInstance();
mapboxgl.accessToken = mapboxService.getApiKey();

export function initializeMap() {
  // Get default configuration
  const { defaultCenter, defaultZoom } = mapboxService.getConfig();

  // Initialize map with default settings
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/cacaosphere/cm2d1jo0100ut01pe2m9de4am',
    center: defaultCenter,
    zoom: defaultZoom,
    projection: 'globe',
  });

  // Track current state
  let currentPopup: mapboxgl.Popup | undefined;
  let currentMarker: HTMLElement | undefined;
  let currentItem: HTMLElement | undefined;

  // Get all map items from the DOM
  const items = document.querySelectorAll('.map-coop_item') as NodeListOf<HTMLElement>;

  items.forEach((cmsItem) => {
    // Get coordinates and content for each marker
    const lat = (cmsItem.querySelector('.map-coop_item-lat') as HTMLElement)?.innerText ?? '';
    const lon = (cmsItem.querySelector('.map-coop_item-lon') as HTMLElement)?.innerText ?? '';
    const body = cmsItem.querySelector('.map-coop_popup') as HTMLElement;
    const link = cmsItem.querySelector('a')?.href;

    // Create marker element
    const el = document.createElement('div');
    el.classList.add('star');
    el.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.17621 19.7478C0.334799 22.2773 0.770919 27.6525 0.969156 30.0238L1.76211 30.8143C3.348 30.8143 9.8898 32 16.0351 32C22.1805 32 27.1364 30.0238 29.7134 26.0715C32.2905 22.1192 32.0923 14.2146 31.894 12.0408C31.7355 10.3018 31.1672 3.93858 30.9029 0.97434C30.4403 0.974341 27.5328 0.81625 19.6034 0.18388C9.69156 -0.606583 5.72683 1.17196 2.55505 5.12427C-0.616735 9.07658 -0.0220263 16.586 0.17621 19.7478Z" fill="#92348E"/>
        <path d="M16 24V8" stroke="#FFFAF7" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M8 16L24 16" stroke="#FFFAF7" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `;

    // Create popup
    const popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: false,
      maxWidth: 'auto',
    }).setHTML(body.outerHTML);

    // Add marker to map
    new mapboxgl.Marker(el)
      .setLngLat([parseFloat(lon), parseFloat(lat)])
      .setPopup(popup)
      .addTo(map);

    // Handle map click to close popup
    map.on('click', (e) => {
      if (
        e.originalEvent.srcElement instanceof HTMLElement &&
        e.originalEvent.srcElement.ariaLabel === 'Map'
      ) {
        currentMarker?.classList.remove('show');
      }
    });

    // MARKER CLICK EVENT
    el.addEventListener('click', () => {
      const isMobile = window.innerWidth <= 991;

      // Calculate viewport and popup dimensions for centering
      const viewportHeight = window.innerHeight;

      // Add popup to map to get its dimensions
      popup.addTo(map);
      const popupElement = popup.getElement();
      const popupHeight = popupElement?.offsetHeight || 0;

      // Calculate vertical offset for centering
      const verticalOffset = (viewportHeight - popupHeight) / 2;

      const coordinates: [number, number] = [parseFloat(lon), parseFloat(lat)];

      // Reset previous marker/popup state
      if (currentMarker) {
        currentItem?.classList.remove('active');
        currentMarker.classList.remove('show');
        currentPopup?.remove();
      }

      // Center map on marker with popup centered in viewport
      map.flyTo({
        center: coordinates,
        zoom: 4,
        essential: true,
        offset: [0, -verticalOffset],
        padding: {
          top: viewportHeight / 4,
          bottom: viewportHeight / 4,
          left: 100,
          right: 100,
        },
      });

      popup.setLngLat(coordinates);

      // Update current state
      currentItem = cmsItem;
      currentItem.classList.add('active');
      currentMarker = el;
      currentMarker.classList.add('show');
      currentPopup = popup;

      // Handle mobile redirect
      if (isMobile && link) {
        window.location.href = link;
      }
    });

    // Desktop-only hover events
    if (window.innerWidth > 991) {
      el.addEventListener('mouseover', () => {
        popup.addTo(map);
        el.classList.add('show');
      });

      el.addEventListener('mouseout', () => {
        if (currentMarker !== el) {
          popup.remove();
          el.classList.remove('show');
        }
      });
    }

    // LIST ITEM CLICK EVENT
    cmsItem.addEventListener('click', () => {
      // Calculate viewport and popup dimensions for centering
      const viewportHeight = window.innerHeight;

      popup.addTo(map);
      const popupElement = popup.getElement();
      const popupHeight = popupElement?.offsetHeight || 0;

      // Calculate vertical offset for centering
      const verticalOffset = (viewportHeight - popupHeight) / 2;

      const coordinates: [number, number] = [parseFloat(lon), parseFloat(lat)];

      // Reset previous marker/popup state
      if (currentMarker) {
        currentItem?.classList.remove('active');
        currentMarker.classList.remove('show');
        currentPopup?.remove();
      }

      // Center map on marker with popup centered in viewport
      map.flyTo({
        center: coordinates,
        zoom: 4,
        essential: true,
        offset: [0, -verticalOffset],
        padding: {
          top: viewportHeight / 4,
          bottom: viewportHeight / 4,
          left: 100,
          right: 100,
        },
      });

      popup.setLngLat(coordinates);

      // Update current state
      el.classList.add('show');
      currentMarker = el;
      currentPopup = popup;
      currentItem = cmsItem;
      currentItem.classList.add('active');
    });

    // Desktop-only list item hover events
    if (window.innerWidth > 991) {
      cmsItem.addEventListener('mouseover', () => {
        popup.addTo(map);
        el.classList.add('show');
      });

      cmsItem.addEventListener('mouseout', () => {
        if (currentMarker !== el) {
          popup.remove();
          el.classList.remove('show');
        }
      });
    }
  });
}
