export function hideSectionIfCmsEmpty() {
  // Find all sections with if-empty="hide" attribute
  const sections = document.querySelectorAll('section[if-empty="hide"]');

  sections.forEach((section) => {
    // Find all dynamic lists within this section
    const dynLists = section.querySelectorAll('.w-dyn-list');

    // If there are dynamic lists in this section
    if (dynLists.length > 0) {
      // Check if ALL dynamic lists have empty state
      const allListsEmpty = Array.from(dynLists).every((list) => {
        return list.querySelector('.w-dyn-empty') !== null;
      });

      // If all lists are empty, hide the section
      if (allListsEmpty && section instanceof HTMLElement) {
        section.style.display = 'none';
      }
    }
  });
}
