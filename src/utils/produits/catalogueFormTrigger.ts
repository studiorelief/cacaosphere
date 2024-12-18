export function catalogueFormTrigger() {
  // Get the trigger button
  const triggerButton = document.querySelector('#cache-trigger');

  if (triggerButton) {
    triggerButton.addEventListener('click', () => {
      // Get product name from attribute
      const productName = triggerButton.getAttribute('produit');

      if (productName) {
        // Store in localStorage and ensure it persists
        window.localStorage.setItem('selectedProduct', productName);

        // Double check storage was set
        const stored = window.localStorage.getItem('selectedProduct');
        if (!stored) {
          window.localStorage.setItem('selectedProduct', productName);
        }
      }
    });
  }

  // Check if we're on contact page
  if (window.location.pathname === '/fr/contact' || window.location.pathname === '/en/contact') {
    // Get stored product name
    const storedProduct = localStorage.getItem('selectedProduct');

    if (storedProduct) {
      // Find all checkboxes
      const checkboxes = document.querySelectorAll('.w-checkbox.form_checkbox');

      checkboxes.forEach((checkbox) => {
        if (checkbox instanceof HTMLElement) {
          const checkboxId = checkbox.getAttribute('id');

          if (checkboxId === storedProduct) {
            // Get the input element and trigger events
            const input = checkbox.querySelector('input');
            if (input instanceof HTMLInputElement) {
              input.dispatchEvent(new Event('change'));
              input.dispatchEvent(new Event('input'));
              input.click();
            }
          }
        }
      });

      // Clear storage after 5 seconds
      setTimeout(() => {
        localStorage.removeItem('selectedProduct');
      }, 5000);
    }
  }
}
