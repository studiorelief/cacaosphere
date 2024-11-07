export function catalogueLoader() {
  // Get elements
  const loadingElement = document.querySelector('.section_loader');
  const isLoadElements = document.querySelectorAll('.is-load');

  // Initial state for .is-load elements
  isLoadElements.forEach((element) => {
    const el = element as HTMLElement;
    el.style.opacity = '0';
    el.style.transform = 'translateY(-5rem)';
    el.style.display = 'none';
  });

  // Fade out loading element
  if (loadingElement) {
    const loadEl = loadingElement as HTMLElement;
    loadEl.style.transition = 'all 250ms ease-in';
    loadEl.style.opacity = '0';
    loadEl.style.transform = 'translateY(100%)';
    loadEl.style.display = 'none';
  }

  // Fade in .is-load elements
  isLoadElements.forEach((element) => {
    const el = element as HTMLElement;
    el.style.display = 'block';

    // Small delay to ensure display:block is applied before transition
    setTimeout(() => {
      el.style.transition = 'all 250ms ease-in';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 10);
  });
}
