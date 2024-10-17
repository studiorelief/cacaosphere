export function formInputLabels() {
  const formInputs = document.querySelectorAll('.form_input');

  formInputs.forEach((input) => {
    const label = input.nextElementSibling as HTMLElement;

    input.addEventListener('click', () => {
      if (label && label.classList.contains('form_label')) {
        label.classList.add('is-active');
      }
    });

    // Gestion autocomplete
    input.addEventListener('input', () => {
      if (label && label.classList.contains('form_label')) {
        if ((input as HTMLInputElement).value !== '') {
          label.classList.add('is-active');
        } else {
          label.classList.remove('is-active');
        }
      }
    });

    // Gestion hover out
    input.addEventListener('blur', () => {
      if (
        label &&
        label.classList.contains('form_label') &&
        (input as HTMLInputElement).value === ''
      ) {
        label.classList.remove('is-active');
      }
    });
  });
}
