let lastScrollTop = 0;

export function navScroll() {
  const navbar = document.querySelector('.nav_desktop') as HTMLElement;
  const navButton = navbar?.querySelector('.nav_button-wrapper') as HTMLElement;
  if (!navbar || !navButton) return;

  // smooth transform
  navbar.style.transition = 'transform 0.25s ease-out';
  navButton.style.transition = 'transform 0.25s ease-out';

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isScrollingDown = scrollTop > lastScrollTop;
    const isAboveThreshold = scrollTop > 18 * 16;

    if (isScrollingDown && isAboveThreshold) {
      navbar.style.transform = 'translateY(-5rem)';
      navButton.style.transform = 'translateY(5rem)'; // Counteracts parent movement
    } else {
      navbar.style.transform = 'translateY(0)';
      navButton.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
  });
}

export function setCurrentDropdownState() {
  const dropdowns = document.querySelectorAll('.nav_dropdown');

  dropdowns.forEach((dropdown) => {
    const currentRow = dropdown.querySelector('.nav_dropdown-list-row.w--current');
    const toggleLink = dropdown.querySelector('.nav_link-wrapper.is-toggle');

    if (currentRow && toggleLink) {
      toggleLink.classList.add('is-current');
    }
  });
}

export function setCurrentRowFromURL() {
  const dropdownRows = document.querySelectorAll('.nav_dropdown-list-row');
  const currentURL = window.location.href;

  dropdownRows.forEach((row) => {
    const rowLink = row.getAttribute('href');
    if (!rowLink) return;

    // Decode URL components for proper comparison
    const decodedRowLink = decodeURIComponent(rowLink);
    const decodedCurrentURL = decodeURIComponent(currentURL);

    // Check if current URL contains the row's href
    if (decodedCurrentURL.includes(decodedRowLink)) {
      row.classList.add('w--current');
    }
  });
}
