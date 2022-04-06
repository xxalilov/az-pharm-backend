const modal = document.querySelector(".edit-header-form-inputs");

export const openModal = (markup) => {
  modal.innerHTML = markup;
  $("#exampleModal").modal("show");
};

export const closeModal = () => {
  $("#exampleModal").modal("hide");
};

export const addContent = (markup) => {
  console.log(markup);
};
