import { selectOne } from "./_functions";

const alert = selectOne(".alert-box");
const alertMessage = selectOne(".alert-message");
const removeBtn = selectOne(".alert-remove");

export const hideAlert = () => {
  alert.classList.remove(`show`);
};

export const showAlert = (text, time, type) => {
  hideAlert();

  alertMessage.innerText = text;
  alert.classList.add(`alert-${type}`);
  alert.classList.add(`show`);
  window.setTimeout(hideAlert, time * 1000);
};

if (removeBtn) {
  removeBtn.addEventListener("click", () => {
    hideAlert();
  });
}
