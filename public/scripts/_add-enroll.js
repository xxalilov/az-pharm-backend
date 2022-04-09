import axios from "axios";
import { selectOne } from "./_functions";

export const addEnroll = async (data, api) => {
  let message = selectOne(".success-sender");
  try {
    const res = await axios({
      method: "POST",
      url: api,
      data,
    });

    if (res.data.success) {
      selectOne(".ism").value = "";
      selectOne(".dori-nomi").value = "";
      selectOne(".telefon").value = "";
      message.innerHTML = `
      <span>Muvaffaqiyatli yuborildi</span>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="9" r="9" fill="white"/>
          <path d="M4 8L8 12L14 6" stroke="#0EBB53" stroke-width="1.5"/>
      </svg>
      `;
    }
  } catch (err) {}
};

export const addContact = async (data, api) => {
  let message = selectOne(".sec-send");
  try {
    const res = await axios({
      method: "POST",
      url: api,
      data,
    });

    if (res.data.success) {
      selectOne(".contact-name").value = "";
      selectOne(".contact-phone").value = "";
      selectOne(".contact-message").value = "";
      message.innerHTML = `
        <span>Muvaffaqiyatli yuborildi</span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="9" fill="white"/>
            <path d="M4 8L8 12L14 6" stroke="#0EBB53" stroke-width="1.5"/>
        </svg>
        `;
    }
  } catch (err) {}
};
