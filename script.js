const FADE_DELAY_MS = 1000;
const statusMessages = [
  'Establishing wormhole telemetry…',
  'Quantum marinara stabilizing…',
  'Awaiting cosmic approval…',
];

let statusIndex = 0;

function getNextStatusMessage() {
  const message = statusMessages[statusIndex];
  statusIndex = (statusIndex + 1) % statusMessages.length;
  return message;
}

function createFadeController(overlay) {
  if (!overlay) {
    return { triggerFade: () => {} };
  }

  let fadeTimeoutId = null;

  const resetOverlay = () => {
    overlay.classList.remove('is-visible');
    overlay.setAttribute('aria-hidden', 'true');
    void overlay.offsetWidth;
  };

  const triggerFade = () => {
    resetOverlay();

    if (fadeTimeoutId) {
      clearTimeout(fadeTimeoutId);
      fadeTimeoutId = null;
    }

    fadeTimeoutId = window.setTimeout(() => {
      overlay.classList.add('is-visible');
      overlay.setAttribute('aria-hidden', 'false');
      fadeTimeoutId = null;
    }, FADE_DELAY_MS);
  };

  overlay.addEventListener(
    'transitionend',
    (event) => {
      if (event.propertyName === 'opacity' && overlay.classList.contains('is-visible')) {
        overlay.focus({ preventScroll: true });
      }
    },
    { passive: true }
  );

  return { triggerFade };
}

function handleFormSubmission(options, event) {
  event.preventDefault();

  const { statusArea, submitButton, fadeController, overlay } = options;

  if (statusArea) {
    statusArea.textContent = getNextStatusMessage();
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Transmitting…';
  }

  fadeController.triggerFade();

}

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('meatball-form');
  if (!form) return;

  const statusArea = document.querySelector('.status');
  const submitButton = form.querySelector('button[type="submit"]');
  const overlay = document.getElementById('fade-overlay');
  const fadeController = createFadeController(overlay);

  const submissionOptions = { statusArea, submitButton, fadeController, overlay };

  form.addEventListener('submit', handleFormSubmission.bind(null, submissionOptions));
});
