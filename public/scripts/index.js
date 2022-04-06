import { selectOne } from "./_functions";
import { login } from "./_login";
import updateData from "./_updateData";
import { openModal } from "./_modal";

// DOM ELEMENTS
const loginForm = selectOne(".form--login");
const editHeaderForm = selectOne(".edit-header-form");
const editHeaderBtn = selectOne(".editHeader");

export default () => {
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = selectOne(".email").value;
      const password = selectOne(".password").value;

      login(email, password);
    });
  }

  if (editHeaderBtn) {
    editHeaderBtn.addEventListener("click", (e) => {
      const markup = `
      <div class="form-group">
      <label for="recipient-name" class="col-form-label"
        >Phone Number:</label
      >
      <input
        type="text"
        class="form-control phoneNumber"
        id="recipient-name"
        style="color: black"
        placeholder="+998973130903"
        required
      />
    </div>
    <div class="form-group">
      <label for="recipient-name" class="col-form-label"
        >Instagram:</label
      >
      <input
        type="url"
        class="form-control instagram"
        id="recipient-name"
        style="color: black"
        placeholder="https://www.instagram.com/xolbek_xalilov/"
        required
      />
    </div>
    <div class="form-group">
      <label for="recipient-name" class="col-form-label">Telegram:</label>
      <input
        type="url"
        class="form-control telegram"
        id="recipient-name"
        style="color: black"
        placeholder="https://t.me/xalilov_01"
        required
      />
    </div>
    <div class="form-group">
      <label for="recipient-name" class="col-form-label">Facebook:</label>
      <input
        type="url"
        class="form-control facebook"
        id="recipient-name"
        style="color: black"
        placeholder="https://www.facebook.com/xolbek.xalilov/"
        required
      />
    </div>
      `;
      openModal(markup);
    });
  }

  if (editHeaderForm) {
    editHeaderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const phoneNumber = selectOne(".phoneNumber").value;
      const instagram = selectOne(".instagram").value;
      const telegram = selectOne(".telegram").value;
      const facebook = selectOne(".facebook").value;
      const data = {
        phoneNumber,
        instagram,
        telegram,
        facebook,
      };
      updateData(data, "/api/v1/edit-header");
    });
  }
};
