import axios from "axios";
import { showAlert, hideAlert } from "./_alerts";

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

    console.log(res.data);

    if (res.data.success) {
      window.setTimeout(() => {
        location.assign("/admin/dashboard");
      }, 1000);
    }
  } catch (err) {
    showAlert(10);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "api/v1/admin/logout",
    });
    if (res.data.success) location.reload(true);
  } catch (err) {
    console.log(err);
  }
};
