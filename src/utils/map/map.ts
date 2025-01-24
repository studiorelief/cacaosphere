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

  const items = document.querySelectorAll('.map-coop_list') as NodeListOf<HTMLElement>;

  items.forEach((cmsItem) => {
    const lat = (cmsItem.querySelector('.map-coop_item-lat') as HTMLElement)?.innerText ?? '';
    const lon = (cmsItem.querySelector('.map-coop_item-lon') as HTMLElement)?.innerText ?? '';
    const body = cmsItem.querySelector('.map-coop_popup') as HTMLElement;

    const el = document.createElement('div');
    el.classList.add('star');

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
