import { selectOne } from "./_functions";

export const hideAlert = () => {
  const el = selectOne(".alert");
  if (el) el.parentElement.removeChild(el);
};

export const showAlert = (time) => {
  hideAlert();
  const markup = `<div class="alert alert-danger mt-2" role="alert">
  Email or password is incorrect!
</div>`;
  document.querySelector(".al").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, time * 1000);
};
