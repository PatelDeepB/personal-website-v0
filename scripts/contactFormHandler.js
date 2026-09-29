/**
 * Contact Form and Feedback Toast Handler Module
 * Manages form validation, optimistic submission feedback, and clipboard copying.
 */

const TOAST_TIMEOUT_MS = 3500;

/**
 * Initializes contact interactions and feedback elements.
 * @returns {void}
 */
export function initializeContactFeatures() {
  const contactForm = document.querySelector('#contactForm');
  const copyEmailButton = document.querySelector('#copyEmailBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  if (copyEmailButton) {
    copyEmailButton.addEventListener('click', handleCopyEmail);
  }
}

/**
 * Handles the contact form submission with validation.
 * @param {SubmitEvent} event
 * @returns {void}
 */
function handleFormSubmit(event) {
  event.preventDefault();

  const formElement = event.currentTarget;
  if (!(formElement instanceof HTMLFormElement)) {
    return;
  }

  const isValid = validateFormFields(formElement);
  if (!isValid) {
    return;
  }

  const submitButton = formElement.querySelector('#submitBtn');
  if (submitButton instanceof HTMLButtonElement) {
    submitButton.disabled = true;
    submitButton.textContent = 'Sending Message...';
  }

  // Simulate server processing without unhandled asynchronous states
  window.setTimeout(function finalizeSubmission() {
    formElement.reset();
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
    showToastNotification('Thank you! Your message has been sent successfully.');
  }, 900);
}

/**
 * Validates individual inputs and displays feedback.
 * @param {HTMLFormElement} form
 * @returns {boolean}
 */
function validateFormFields(form) {
  let isAllValid = true;

  const nameInput = form.querySelector('#senderName');
  const emailInput = form.querySelector('#senderEmail');
  const messageInput = form.querySelector('#senderMessage');

  if (nameInput instanceof HTMLInputElement) {
    const isNameValid = nameInput.value.trim().length >= 2;
    toggleFieldStatus(nameInput, isNameValid);
    if (!isNameValid) isAllValid = false;
  }

  if (emailInput instanceof HTMLInputElement) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(emailInput.value.trim());
    toggleFieldStatus(emailInput, isEmailValid);
    if (!isEmailValid) isAllValid = false;
  }

  if (messageInput instanceof HTMLTextAreaElement) {
    const isMessageValid = messageInput.value.trim().length >= 5;
    toggleFieldStatus(messageInput, isMessageValid);
    if (!isMessageValid) isAllValid = false;
  }

  return isAllValid;
}

/**
 * Toggles error state on the parent form-group element.
 * @param {HTMLElement} inputElement
 * @param {boolean} isValid
 * @returns {void}
 */
function toggleFieldStatus(inputElement, isValid) {
  const formGroup = inputElement.closest('.form-group');
  if (formGroup) {
    formGroup.classList.toggle('has-error', !isValid);
  }
}

/**
 * Copies the primary email address to the user clipboard.
 * @returns {Promise<void>}
 */
async function handleCopyEmail() {
  const emailAddress = 'deepbpatel9898@gmail.com';

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(emailAddress);
      showToastNotification('Email copied to clipboard: ' + emailAddress);
    } else {
      fallbackCopyText(emailAddress);
    }
  } catch (copyError) {
    console.error('Failed to copy email:', copyError);
    showToastNotification('Email: ' + emailAddress);
  }
}

/**
 * Fallback copy method for older browsers.
 * @param {string} textToCopy
 * @returns {void}
 */
function fallbackCopyText(textToCopy) {
  const temporaryInput = document.createElement('textarea');
  temporaryInput.value = textToCopy;
  temporaryInput.setAttribute('readonly', '');
  temporaryInput.style.position = 'absolute';
  temporaryInput.style.left = '-9999px';
  document.body.appendChild(temporaryInput);
  temporaryInput.select();
  document.execCommand('copy');
  document.body.removeChild(temporaryInput);
  showToastNotification('Email copied to clipboard: ' + textToCopy);
}

/**
 * Displays a toast notification with the given message.
 * @param {string} toastMessage
 * @returns {void}
 */
export function showToastNotification(toastMessage) {
  const toastElement = document.querySelector('#toastNotification');
  const toastText = document.querySelector('#toastMessageText');

  if (!toastElement || !toastText) {
    return;
  }

  toastText.textContent = toastMessage;
  toastElement.classList.add('show');

  window.setTimeout(function hideToast() {
    toastElement.classList.remove('show');
  }, TOAST_TIMEOUT_MS);
}
