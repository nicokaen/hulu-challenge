export function onError(error: unknown) {
  console.error('Error running the app:', error);

  const errorMessage = document.createElement('div');
  errorMessage.setAttribute('role', 'alert');
  errorMessage.setAttribute('aria-live', 'assertive');
  errorMessage.textContent =
    'Oops! It seems like we took a wrong turn at Albuquerque. Please try again later.';
  errorMessage.classList.add('error-message');
  document.body.appendChild(errorMessage);

  setTimeout(() => {
    document.body.removeChild(errorMessage);
  }, 5000);
}
