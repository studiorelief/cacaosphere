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

export function showSiret() {
  const siretTriggers = document.querySelectorAll('#project_siret-on, #sample_siret-on');
  const siretContainers = document.querySelectorAll('#project_siret-input, #sample_siret-input');

  siretTriggers.forEach((siretTrigger, index) => {
    const siretContainer = siretContainers[index];

    if (siretTrigger && siretContainer) {
      const { parentElement } = siretTrigger;

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (parentElement?.classList.contains('is-active-inputactive')) {
              (siretContainer as HTMLElement).style.display = 'flex';
            } else {
              (siretContainer as HTMLElement).style.display = 'none';
            }
          }
        });
      });

      observer.observe(parentElement as Node, { attributes: true });
    }
  });
}
