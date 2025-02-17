import mapboxgl from 'mapbox-gl';

import MapboxService from '../../services/mapbox.service';

const mapboxService = MapboxService.getInstance();
mapboxgl.accessToken = mapboxService.getApiKey();

export function initializeMap() {
  const { defaultCenter, defaultZoom } = mapboxService.getConfig();

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/cacaosphere/cm2d1jo0100ut01pe2m9de4am',
    center: defaultCenter,
    zoom: defaultZoom,
    projection: 'globe',
  });

  // Track current active elements
  let currentPopup: mapboxgl.Popup | undefined;
  let currentMarker: HTMLElement | undefined;
  let currentItem: HTMLElement | undefined;

  const items = document.querySelectorAll('.map-coop_item') as NodeListOf<HTMLElement>;

  items.forEach((cmsItem) => {
    // State variables for each marker/popup pair
    let isOverPopup = false;
    let timeoutId: NodeJS.Timeout | null = null;

    const lat = (cmsItem.querySelector('.map-coop_item-lat') as HTMLElement)?.innerText ?? '';
    const lon = (cmsItem.querySelector('.map-coop_item-lon') as HTMLElement)?.innerText ?? '';
    const body = cmsItem.querySelector('.map-coop_popup') as HTMLElement;

    // Create marker element
    const el = document.createElement('div');
    el.classList.add('star');

    // Add SVG icon to marker
    el.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.17621 19.7478C0.334799 22.2773 0.770919 27.6525 0.969156 30.0238L1.76211 30.8143C3.348 30.8143 9.8898 32 16.0351 32C22.1805 32 27.1364 30.0238 29.7134 26.0715C32.2905 22.1192 32.0923 14.2146 31.894 12.0408C31.7355 10.3018 31.1672 3.93858 30.9029 0.97434C30.4403 0.974341 27.5328 0.81625 19.6034 0.18388C9.69156 -0.606583 5.72683 1.17196 2.55505 5.12427C-0.616735 9.07658 -0.0220263 16.586 0.17621 19.7478Z" fill="#92348E"/>
        <path d="M16 24V8" stroke="#FFFAF7" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M8 16L24 16" stroke="#FFFAF7" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `;

    // Create popup with custom configuration
    const popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: false,
      maxWidth: 'auto',
    }).setHTML(body.outerHTML);

    // Handle mouse leave with debounce to prevent flickering
    const handleMouseLeave = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        if (!isOverPopup && currentMarker !== el) {
          popup.remove();
          el.classList.remove('show');
        }
        timeoutId = null;
      }, 150); // Delay to allow smooth transition to popup
    };

    // Add mouse events to popup when it opens
    popup.on('open', () => {
      const popupElement = popup.getElement();
      if (popupElement) {
        // Handle mouse enter on popup
        popupElement.addEventListener('mouseenter', () => {
          isOverPopup = true;
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
        });

        // Handle mouse leave from popup
        popupElement.addEventListener('mouseleave', () => {
          isOverPopup = false;
          handleMouseLeave();
        });
      }
    });

    // Add marker to map
    new mapboxgl.Marker(el)
      .setLngLat([parseFloat(lon), parseFloat(lat)])
      .setPopup(popup)
      .addTo(map);

    // Close popup when clicking on map
    map.on('click', (e) => {
      if (
        e.originalEvent.srcElement instanceof HTMLElement &&
        e.originalEvent.srcElement.ariaLabel === 'Map'
      ) {
        currentMarker?.classList.remove('show');
      }
    });

    // MARKER CLICK EVENT - Handles marker activation and map movement
    el.addEventListener('click', () => {
      const popupElement = popup.getElement();
      const popupHeight = popupElement?.offsetHeight || 0;

      // Calculate offset for centering
      const offset = {
        x: 0,
        y: -popupHeight / 2,
      };

      const coordinates: [number, number] = [parseFloat(lon), parseFloat(lat)];

      // Clear previous active states
      if (currentMarker) {
        currentItem?.classList.remove('active');
        currentMarker.classList.remove('show');
        currentPopup?.remove();
      }

      // Animate map to new position
      map.flyTo({
        center: [
          coordinates[0] + offset.x / (map.getZoom() * 100),
          coordinates[1] + offset.y / (map.getZoom() * 100),
        ] as [number, number],
        zoom: 8,
        essential: true,
        padding: {
          top: 100,
          bottom: 100,
          left: 100,
          right: 100,
        },
      });

      // Show popup after map movement
      setTimeout(() => {
        popup.addTo(map);
        const popupCoordinates = popup.getLngLat();
        if (popupCoordinates) {
          popup.setLngLat(coordinates);
        }
      }, 500);

      // Update current active elements
      currentItem = cmsItem;
      currentItem.classList.add('active');
      currentMarker = el;
      currentMarker.classList.add('show');
      currentPopup = popup;
    });

    // MARKER HOVER EVENTS
    el.addEventListener('mouseover', () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      popup.addTo(map);
      el.classList.add('show');
    });

    el.addEventListener('mouseout', () => {
      handleMouseLeave();
    });

    // LIST ITEM EVENTS - Similar to marker events but triggered from list
    cmsItem.addEventListener('click', () => {
      // ... Similar to marker click event ...
    });

    cmsItem.addEventListener('mouseover', () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      popup.addTo(map);
      el.classList.add('show');
    });

    cmsItem.addEventListener('mouseout', () => {
      handleMouseLeave();
    });
  });
}
