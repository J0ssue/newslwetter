(function () {
  const form = document.querySelector(".newsletter-form");
  const newsletters = document.querySelectorAll(".newsletter");
  const email = form.querySelector("#email-input");
  const agreementCheckbox = form.querySelector("#subscribe-agreement-input");
  const submitButton = form.querySelector("#submit-button");
  const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const newslettersToReceive = {
    email: "",
    hasFutureNewsletter: false,
    newsletters: [],
  };

  /**
   * Add event Listeners
   */
  // agreementCheckbox.addEventListener("change", (e) => {
  //   handleEnableSubmitButton(e.target.checked);
  // });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!emailValidator.test(email.value)) {
      alert("WARNING: please enter valid email");
      return;
    }
    if (email.value.length > 0) {
      if (hasNewsletters() > 0) {
        handleSubmission(email.value);
      } else {
        alert("ERROR: please select a newsletter");
      }
    } else {
      alert("ERRO: please enter email");
    }
  });

  /**
   * Toggles button from enabled to disabled
   */
  function handleEnableSubmitButton(isEnabled) {
    if (isEnabled) {
      submitButton.disabled = false;
      toggleSubmitButton();
    } else {
      submitButton.disabled = true;
      toggleSubmitButton();
    }
  }

  /**
   * Toggles submit button class name
   */
  function toggleSubmitButton() {
    submitButton.classList.toggle("disabled-button");
  }

  /**
   * Checks if there are any newsletters selected
   */
  function hasNewsletters() {
    let hasLetter = 0;
    newsletters.forEach((newsletter) => {
      if (newsletter.querySelector("input").checked) {
        hasLetter++;
      }
    });
    return hasLetter;
  }

  /**
   * Adds newsletter
   */
  function addNewsletter(name, description) {
    newslettersToReceive.newsletters.push({
      name,
      description,
    });
  }

  /**
   * Handles form submission
   */
  function handleSubmission(emailValue) {
    const id = setTimeout(() => {
      newslettersToReceive.email = emailValue;
      newslettersToReceive.hasFutureNewsletter = agreementCheckbox.checked;
      newsletters.forEach((newsletter) => {
        if (newsletter.querySelector("input").checked) {
          addNewsletter(
            newsletter.querySelector("h3").innerText,
            newsletter.querySelector("p").innerText
          );
        }
      });
      alert("SUCCESS:" + JSON.stringify(newslettersToReceive, null, 4));
      form.reset();
      clearTimeout(id);
    }, 2000);
  }
})();
