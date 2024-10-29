// Function to check if `?tous-les-articles` in the URL
export function checkURLParameter() {
  const sectionState1 = document.querySelector<HTMLElement>('.section_state1');
  const sectionState2 = document.querySelector<HTMLElement>('.section_state2');
  const sectionState3 = document.querySelector<HTMLElement>('.section_state3');

  if (!sectionState1 || !sectionState2 || !sectionState3) {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('tous-les-articles')) {
    sectionState1.style.display = 'none';
    sectionState2.style.display = 'block';
    sectionState3.style.display = 'none';
  }
}

// Function to init view
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

  // Check URL parameter on page load
  checkURLParameter();

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

//Function to transcribe the search bar
export function mirrorBlogSearch() {
  const blogField = document.querySelector<HTMLElement>('#blog-field');
  const searchMirror = document.getElementById('blog-all-articles_search-mirror');

  if (!blogField || !searchMirror) {
    return;
  }

  // Add event listener for input field
  blogField.addEventListener('input', () => {
    const inputText = (blogField as HTMLInputElement).value; // Retrieve input value
    searchMirror.innerHTML = `&nbsp;${inputText}`; // Add space
  });
}

// Function to handle placeholder styling during input
export function searchBarPlaceholderStyling() {
  const inputField = document.querySelector<HTMLInputElement>('.header_v3_blog-field');

  if (!inputField) {
    return;
  }

  // Event listener for input event
  inputField.addEventListener('input', () => {
    if (inputField.value.trim() !== '') {
      inputField.classList.add('placeholder-active');
    } else {
      inputField.classList.remove('placeholder-active');
    }
  });
}
