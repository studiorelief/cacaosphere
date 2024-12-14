import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2FjYW9zcGhlcmUiLCJhIjoiY20yYWw5YXlvMGZ2dDJqczdsYm13bzA4aSJ9.cO_ViZ1EjIMOCjXv17TtQA';

export function initializeMap() {
  const monument: [number, number] = [-58.443832, -14.235004]; // Amérique du Sud (Brésil)

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/cacaosphere/cm2d1jo0100ut01pe2m9de4am',
    center: monument,
    zoom: 3,
    projection: 'globe',
  });

  let currentPopup: mapboxgl.Popup | undefined;
  let currentMarker: HTMLElement | undefined;
  let currentItem: HTMLElement | undefined;

  const items = document.querySelectorAll('.map-coop_item') as NodeListOf<HTMLElement>;

  items.forEach((cmsItem) => {
    const lat = (cmsItem.querySelector('.map-coop_item-lat') as HTMLElement)?.innerText ?? '';
    const lon = (cmsItem.querySelector('.map-coop_item-lon') as HTMLElement)?.innerText ?? '';
    const body = cmsItem.querySelector('.map-coop_popup') as HTMLElement;

    const el = document.createElement('div');
    el.classList.add('star');

    // Créer le SVG directement
    el.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.17621 19.7478C0.334799 22.2773 0.770919 27.6525 0.969156 30.0238L1.76211 30.8143C3.348 30.8143 9.8898 32 16.0351 32C22.1805 32 27.1364 30.0238 29.7134 26.0715C32.2905 22.1192 32.0923 14.2146 31.894 12.0408C31.7355 10.3018 31.1672 3.93858 30.9029 0.97434C30.4403 0.974341 27.5328 0.81625 19.6034 0.18388C9.69156 -0.606583 5.72683 1.17196 2.55505 5.12427C-0.616735 9.07658 -0.0220263 16.586 0.17621 19.7478Z" fill="#92348E"/>
        <path d="M16 24V8" stroke="#FFFAF7" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M8 16L24 16" stroke="#FFFAF7" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `;

    const popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: false,
      maxWidth: 'auto',
    }).setHTML(body.outerHTML);

    new mapboxgl.Marker(el)
      .setLngLat([parseFloat(lon), parseFloat(lat)])
      .setPopup(popup)
      .addTo(map);

    map.on('click', (e) => {
      if (
        e.originalEvent.srcElement instanceof HTMLElement &&
        e.originalEvent.srcElement.ariaLabel === 'Map'
      ) {
        currentMarker?.classList.remove('show');
      }
    });

    // MARKER EVENTS
    el.addEventListener('click', () => {
      popup.addTo(map);
      if (currentMarker) {
        currentItem?.classList.remove('active');
        currentMarker.classList.remove('show');
        currentPopup?.remove();
      }
      currentItem = cmsItem;
      currentItem.classList.add('active');
      currentMarker = el;
      currentMarker.classList.add('show');
      map.flyTo({
        center: [parseFloat(lon), parseFloat(lat)],
        zoom: 8,
        essential: true,
      });
    });

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

    // LIST ITEMS EVENTS
    cmsItem.addEventListener('click', () => {
      map.flyTo({
        center: [parseFloat(lon), parseFloat(lat)],
        zoom: 8,
        essential: true,
      });

      if (currentMarker) {
        currentItem?.classList.remove('active');
        currentMarker.classList.remove('show');
        currentPopup?.remove();
      }
      popup.addTo(map);
      el.classList.add('show');
      currentMarker = el;
      currentPopup = popup;
      currentItem = cmsItem;
      currentItem.classList.add('active');
    });

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
  });
}
