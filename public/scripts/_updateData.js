import axios from "axios";
import { showAlert, hideAlert } from "./_alerts";
import { closeModal } from "./_modal";

export default async (data, api) => {
  try {
    const res = await axios({
      method: "PUT",
      url: api,
      data: data,
    });

    if (res.data.success) {
      closeModal();
      window.setTimeout(() => {
        location.assign("/admin/dashboard");
      }, 700);
    }
  } catch (err) {
    console.log(err);
  }
};
