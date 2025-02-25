export function removeStaticListAProposMobile() {
  // Initial check
  handleStaticElements();

  // Add resize listener
  window.addEventListener('resize', handleStaticElements);
}

// Separate function to handle static elements based on window width
function handleStaticElements() {
  if (window.innerWidth < 991) {
    const staticElements = document.querySelectorAll('[fs-cmsstatic-element]');
    staticElements.forEach((element) => {
      element.removeAttribute('fs-cmsstatic-element');
    });
  } else {
    // Re-add the attribute for desktop view
    const elements = document.querySelectorAll('[data-static-element]');
    elements.forEach((element) => {
      element.setAttribute('fs-cmsstatic-element', '');
    });
  }
}
