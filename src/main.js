const form = document.getElementById("contact-form");
const successToast = document.getElementById("success-message");
const submitButton = document.getElementById("submit-button");

const emailErrorMessage = "Please enter a valid email address";
const queryTypeErrorMessage = "Please select a query type";
const consentErrorMessage =
  "To submit this form, please consent to being contacted";

const getInputFormGroup = (input) => {
  if (input.id === "consent") {
    return input.parentElement.parentElement;
  }
  if (input.id === "query-type") {
    return input;
  }
  return input.parentElement;
};

// Show an error message and update ARIA attributes
const showError = (input, message) => {
  console.log(`showing error for ${input.id}`);
  const formGroup = getInputFormGroup(input);
  const errorElement = formGroup.querySelector(".error-text");

  console.log(`error element for ${input.id} is ${errorElement}`);
  input.classList.add("invalid");
  input.setAttribute("aria-invalid", "true");
  input.setAttribute("aria-describedby", errorElement.id);
  errorElement.classList.remove("sr-only");
  errorElement.textContent = message ?? "This field is required";
};

const clearError = (input) => {
  const formGroup = getInputFormGroup(input);
  const errorElement = formGroup.querySelector(".error-text");

  input.classList.remove("invalid");
  input.removeAttribute("aria-invalid");
  input.removeAttribute("aria-describedby");
  errorElement.classList.add("sr-only");
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateFieldset = (fieldset) => {
  const inputs = fieldset.querySelectorAll("input");
  console.log(`inputs for ${fieldset.id} are: `);
  inputs.forEach((input) =>
    console.log(`${input.id} checked: ${input.checked}`)
  );
  return Array.from(inputs).some((input) => input.checked);
};

const validateForm = () => {
  let isFormValid = true;
  const firstNameInput = document.getElementById("first-name");
  const lastNameInput = document.getElementById("last-name");
  const emailInput = document.getElementById("email");
  const queryTypeFieldSet = document.getElementById("query-type");
  const messageInput = document.getElementById("message");
  const confirmationInput = document.getElementById("consent");

  const inputs = [
    firstNameInput,
    lastNameInput,
    emailInput,
    queryTypeFieldSet,
    messageInput,
    confirmationInput,
  ];
  inputs.forEach(clearError);

  // Validate Name and LastName
  if (!firstNameInput.value || firstNameInput.value.trim() === "") {
    showError(firstNameInput);
    isFormValid = false;
  }
  if (!lastNameInput.value || lastNameInput.value.trim() === "") {
    showError(lastNameInput);
    isFormValid = false;
  }

  // Validate Email
  if (!emailInput.value || emailInput.value.trim() === "") {
    showError(emailInput);
    isFormValid = false;
  } else if (!validateEmail(emailInput.value)) {
    showError(emailInput, emailErrorMessage);
    isFormValid = false;
  }

  // Validate QueryType
  if (!validateFieldset(queryTypeFieldSet)) {
    showError(queryTypeFieldSet, queryTypeErrorMessage);
    isFormValid = false;
  }

  // Validate Message
  if (!messageInput.value || messageInput.value.trim() === "") {
    showError(messageInput);
    isFormValid = false;
  }

  // Validate Consent
  if (!confirmationInput.checked) {
    showError(confirmationInput, consentErrorMessage);
    isFormValid = false;
  }

  return isFormValid;
};

document.addEventListener("DOMContentLoaded", () => {
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
      successToast.classList.remove("hidden");
      form.reset();

      setTimeout(() => {
        successToast.classList.add("hidden");
      }, 4000);
    }
  });
});
