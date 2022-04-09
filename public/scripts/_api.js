import axios from "axios";
import { showAlert } from "./_alerts";
import { closeModal } from "./_modal";

export const postFormData = async (data, api, reloadPage) => {
  try {
    const res = await axios({
      method: "POST",
      url: api,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      showAlert("Data created", 10, "succ");
      closeModal();
      window.setTimeout(() => {
        location.assign(reloadPage);
      }, 1000);
    }
  } catch (err) {
    showAlert(err.response.data.error, 10, "fail");
  }
};

export const postData = async (data, api, reloadPage) => {
  try {
    const res = await axios({
      method: "POST",
      url: api,
      data: data,
    });

    if (res.data.success) {
      showAlert("Data created", 10, "succ");
      closeModal();
      window.setTimeout(() => {
        location.assign(reloadPage);
      }, 1000);
    }
  } catch (err) {
    showAlert(err.response.data.error, 10, "fail");
  }
};

export const getDataById = async (api, id, cb) => {
  const url = `${api}/${id}`;

  try {
    const res = await axios({
      method: "GET",
      url,
    });

    if (res.data.success) {
      cb(res.data.data);
    }
  } catch (err) {
    showAlert(err.response.data.error, 10, "fail");
  }
};

export const updateFormData = async (data, api, id, reloadPage) => {
  const url = `${api}/${id}`;
  try {
    const res = await axios({
      method: "PUT",
      url,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      showAlert("Data updated", 10, "succ");
      closeModal();
      window.setTimeout(() => {
        location.assign(reloadPage);
      }, 1000);
    }
  } catch (err) {
    showAlert(err.response.data.error, 10, "fail");
  }
};

export const updateData = async (data, api, id, reloadPage) => {
  const url = `${api}/${id}`;
  try {
    const res = await axios({
      method: "PUT",
      url,
      data: data,
    });

    if (res.data.success) {
      showAlert("Data updated", 10, "succ");
      closeModal();
      window.setTimeout(() => {
        location.assign(reloadPage);
      }, 1000);
    }
  } catch (err) {
    showAlert(err.response.data.error, 10, "fail");
  }
};

export const deleteData = async (api, id, reloadPage) => {
  const url = `${api}/${id}`;
  try {
    const res = await axios({
      method: "DELETE",
      url,
    });

    if (res.data.success) {
      showAlert("Data deleted", 10, "succ");
      closeModal();
      window.setTimeout(() => {
        location.assign(reloadPage);
      }, 1000);
    }
  } catch (err) {
    showAlert(err.response.data.error, 10, "fail");
  }
};
