import throttle from 'lodash/throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('[name="email"]');
const messageInput = form.querySelector('[name="message"]');

function loadFormState() {
  const savedState = localStorage.getItem('feedback-form-state');
  if (savedState) {
    const { email, message } = JSON.parse(savedState);
    emailInput.value = email || '';
    messageInput.value = message || '';
  }
}

function saveFormState() {
  const currentState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(currentState));
}

function clearFormState() {
  localStorage.removeItem('feedback-form-state');
}

const throttledSaveFormState = throttle(saveFormState, 500);

window.addEventListener('DOMContentLoaded', () => {
  loadFormState();
});

form.addEventListener('input', () => {
  throttledSaveFormState();
});

form.addEventListener('submit', event => {
  event.preventDefault();

  console.log('Form submitted with values:');
  console.log('Email:', emailInput.value);
  console.log('Message:', messageInput.value);

  form.reset();
  clearFormState();
});
