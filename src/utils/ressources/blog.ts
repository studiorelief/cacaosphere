export function initBlogSections() {
  const sectionState1 = document.querySelector<HTMLElement>('.section_state1');
  const sectionState2 = document.querySelector<HTMLElement>('.section_state2');
  const sectionState3 = document.querySelector<HTMLElement>('.section_state3');
  const blogField = document.querySelector<HTMLElement>('#blog-field');

  if (!sectionState1 || !sectionState2 || !sectionState3 || !blogField) {
    return;
  }

  // Initial display state
  sectionState1.style.display = 'block';
  sectionState2.style.display = 'none';
  sectionState3.style.display = 'none';

  // Event listener for clicking on the input field
  blogField.addEventListener('click', () => {
    sectionState1.style.display = 'none';
    sectionState2.style.display = 'block';
    sectionState3.style.display = 'none';
  });

  // Event listener for typing in the input field
  blogField.addEventListener('input', () => {
    const inputValue = (blogField as HTMLInputElement).value;

    if (inputValue === '') {
      sectionState1.style.display = 'none';
      sectionState2.style.display = 'block';
      sectionState3.style.display = 'none';
    } else {
      sectionState1.style.display = 'none';
      sectionState2.style.display = 'none';
      sectionState3.style.display = 'block';
    }
  });
}

export function mirrorBlogSearch() {
  const blogField = document.querySelector<HTMLElement>('#blog-field');
  const searchMirror = document.getElementById('blog-all-articles_search-mirror');

  if (!blogField || !searchMirror) {
    return;
  }

  // Ajouter un écouteur d'événements pour le champ de texte
  blogField.addEventListener('input', () => {
    const inputText = (blogField as HTMLInputElement).value; // Récupérer la valeur du champ de texte
    searchMirror.innerHTML = `&nbsp;${inputText}`; // Ajout d'un espace
  });
}
