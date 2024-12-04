export function heroVideoScale() {
  // Sélection des éléments nécessaires
  const bigScreenButton = document.querySelector('#big-screen') as HTMLElement;
  const videoWrapper = document.querySelector('.hp_hero_video-wrapper') as HTMLElement;
  const closeWrapper = document.querySelector('.hp_hero_close-wrapper') as HTMLElement;

  // Vérification que tous les éléments existent
  if (!bigScreenButton || !videoWrapper || !closeWrapper) {
    console.error('Un ou plusieurs éléments nécessaires sont manquants');
    return;
  }

  // Fonction pour agrandir le wrapper vidéo
  function expandVideoWrapper() {
    // Positionnement fixe et centré sur l'écran
    videoWrapper.style.position = 'fixed';
    videoWrapper.style.top = 'calc(50% + 7rem)';
    videoWrapper.style.left = '50%';
    videoWrapper.style.transform = 'translate(-50%, -50%)'; // Centrage parfait
    videoWrapper.style.width = '100vw';
    videoWrapper.style.height = '100vh';
    videoWrapper.style.zIndex = '9999';
    videoWrapper.style.padding = '1rem';
    // Assure que l'élément soit au-dessus des autres

    // Transition smooth
    videoWrapper.style.transition = 'all 0.5s ease';

    // Rendre le wrapper de fermeture visible
    closeWrapper.style.transition = 'opacity 0.5s ease';
    closeWrapper.style.opacity = '1';
    closeWrapper.style.zIndex = '10000'; // Encore plus haut dans la pile

    bigScreenButton.style.display = 'none';
  }

  // Fonction pour réinitialiser le wrapper vidéo
  function resetVideoWrapper() {
    // Réinitialisation des styles
    videoWrapper.style.position = '';
    videoWrapper.style.top = '';
    videoWrapper.style.left = '';
    videoWrapper.style.transform = '';
    videoWrapper.style.width = '';
    videoWrapper.style.height = '';
    videoWrapper.style.zIndex = '';

    // Masquer le wrapper de fermeture
    closeWrapper.style.opacity = '0';
    closeWrapper.style.zIndex = '';

    // Show button
    bigScreenButton.style.display = 'flex';
  }

  // Ajout des écouteurs d'événements
  bigScreenButton.addEventListener('click', expandVideoWrapper);
  closeWrapper.addEventListener('click', resetVideoWrapper);
}
