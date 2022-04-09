import axios from "axios";
import { showAlert } from "./_alerts";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/admin/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.success) {
      showAlert("Welcome!", 10, "succ");
      window.setTimeout(() => {
        location.assign("/admin/dashboard");
      }, 1200);
    }
  } catch (err) {
    showAlert(err.response.data.error, 10, "fail");
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/admin/logout",
    });
    if (res.data.success) location.reload(true);
  } catch (err) {
    showAlert(err.response.data.error, 10, "fail");
  }
};
