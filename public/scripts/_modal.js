const modal = document.querySelector(".modal-body");

export const openModal = (markup) => {
  modal.innerHTML = markup;
  $("#exampleModal").modal("show");
};

export const closeModal = () => {
  $("#exampleModal").modal("hide");
};
