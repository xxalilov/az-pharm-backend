import { selectOne, selectAll } from "./_functions";
import { login, logout } from "./_login";
import {
  postFormData,
  getDataById,
  updateData,
  updateFormData,
  deleteData,
  postData,
} from "./_api";
import { addEnroll, addContact } from "./_add-enroll";
import { openModal } from "./_modal";
import { showAlert } from "./_alerts";

// DOM ELEMENTS
const loginForm = selectOne(".form--login");
const editHeaderBtn = selectOne(".editHeader");
const addSlideBtn = selectOne(".add-slide");
const editSlideBtn = selectAll(".edit-slide");
const deleteSlideBtn = selectAll(".delete-slide");
const addImageBtn = selectOne(".add-image-btn");
const editImageBtn = selectAll(".edit-image");
const deleteImageBtn = selectAll(".delete-image");
const addFeedbackBtn = selectOne(".add-feedback-btn");
const editFeedbackBtn = selectAll(".edit-feedback");
const deleteFeedbackBtn = selectAll(".delete-feedback");
const deleteEnrollBtn = selectAll(".delete-enroll");
const deleteContactBtn = selectAll(".delete-contact-btn");
const enrollForm = selectOne(".enroll-form");
const contactForm = selectOne(".contact-form");
const addAboutBtn = selectOne(".add-about");
const editAboutBtn = selectAll(".edit-about");
const updateAdminDetails = selectOne(".update-admin-details");
const updatePasswordBtn = selectOne(".update-password");
const logoutBtn = selectOne(".logout-btn");
const playVideoBtn = selectOne(".video__play");

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
      getDataById("/api/v1/admin", "homedatas", (curData) => {
        const markup = `
      <form class="edit-header-form">
      <div class="form-group">
      <label for="recipient-name" class="col-form-label"
        >Phone Number:</label
      >
      <input
        type="text"
        class="form-control phoneNumber"
        value="${curData.phoneNumber}"
        name="phoneNumber"
        id="recipient-name"
        style="color: black"
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
        value="${curData.instagram}"
        name="instagram"
        id="recipient-name"
        style="color: black"
        required
      />
    </div>
    <div class="form-group">
      <label for="recipient-name" class="col-form-label">Telegram:</label>
      <input
        type="url"
        class="form-control telegram"
        value="${curData.telegram}"
        name="telegram"
        id="recipient-name"
        style="color: black"
        required
      />
    </div>
    <div class="form-group">
      <label for="recipient-name" class="col-form-label">Facebook:</label>
      <input
        type="url"
        class="form-control facebook"
        value="${curData.facebook}"
        name="facebook"
        id="recipient-name"
        style="color: black"
        required
      />
    </div>
    <div class="modal-footer">
    <button class="btn btn-primary">Add</button>
  </div>
    </form>
      `;
        openModal(markup);

        const editHeaderForm = selectOne(".edit-header-form");

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
            updateData(data, "/api/v1/edit-header", "/admin/dashboard");
          });
        }
      });
    });
  }

  if (addSlideBtn) {
    addSlideBtn.addEventListener("click", () => {
      const markup = `
      <form class="add-slide-form">
      <div class="form-group">
      <label for="recipient-name" class="col-form-label"
        >Title</label
      >
      <input
        type="text"
        class="form-control title"
        id="recipient-name"
        style="color: black"
        required
      />
    </div>
    <div class="form-group">
      <label for="recipient-name" class="col-form-label"
        >Description</label
      >
      <textarea
        type="url"
        class="form-control description"
        id="recipient-name"
        style="color: black"
        required
      ></textarea>
    </div>
    <div class="form-group">
      <label for="recipient-name" class="col-form-label">Image</label>
      <input
        type="file"
        class="form-control image"
        id="recipient-name"
        style="color: black"
        required
      />
    </div>
    <div class="modal-footer">
    <button class="btn btn-primary">Add</button>
  </div>
    </form>
      `;
      openModal(markup);

      const addSlideForm = selectOne(".add-slide-form");

      if (addSlideForm) {
        addSlideForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const title = selectOne(".title").value;
          const description = selectOne(".description").value;
          const image = selectOne(".image").files[0];

          const form = new FormData();
          form.append("title", title);
          form.append("description", description);
          form.append("image", image);
          postFormData(form, "/api/v1/admin/slides", "/admin/slides");
        });
      }
    });
  }

  if (editSlideBtn) {
    editSlideBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        getDataById("/api/v1/admin/slides", btn.value, (curData) => {
          const markup = `
          <form class="add-slide-form">
          <div class="form-group">
          <label for="recipient-name" class="col-form-label"
            >Title</label
          >
          <input
            type="text"
            class="form-control title"
            id="recipient-name"
            style="color: black"
            value="${curData.title}"
            required
          />
        </div>
        <div class="form-group">
          <label for="recipient-name" class="col-form-label"
            >Description</label
          >
          <textarea
            type="url"
            class="form-control description"
            id="recipient-name"
            style="color: black"
            required
          >${curData.description}</textarea>
        </div>
        <div class="form-group">
          <label for="recipient-name" class="col-form-label">Image</label>
          <input
            type="file"
            class="form-control image"
            id="recipient-name"
            style="color: black"
          />
        </div>
        <div class="modal-footer">
        <button class="btn btn-primary">Add</button>
      </div>
        </form>
          `;
          openModal(markup);
          const updateSlideForm = selectOne(".add-slide-form");

          updateSlideForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const title = selectOne(".title").value;
            const description = selectOne(".description").value;
            const image = selectOne(".image").files[0];

            const form = new FormData();
            form.append("title", title);
            form.append("description", description);
            form.append("image", image);
            updateFormData(
              form,
              "/api/v1/admin/slides",
              btn.value,
              "/admin/slides"
            );
          });
        });
      });
    });
  }

  if (deleteSlideBtn) {
    deleteSlideBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        deleteData("/api/v1/admin/slides", btn.value, "/admin/slides");
      });
    });
  }

  if (addImageBtn) {
    addImageBtn.addEventListener("click", () => {
      const markup = `
      <form class="add-slide-form">
    <div class="form-group">
      <label for="recipient-name" class="col-form-label">Image</label>
      <input
        type="file"
        class="form-control image"
        id="recipient-name"
        style="color: black"
        required
      />
    </div>
    <div class="modal-footer">
    <button class="btn btn-primary">Add</button>
  </div>
    </form>
      `;
      openModal(markup);

      const addImageForm = selectOne(".add-slide-form");

      if (addImageForm) {
        addImageForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const image = selectOne(".image").files[0];

          const form = new FormData();
          form.append("image", image);
          postFormData(form, "/api/v1/admin/gallery", "/admin/gallery");
        });
      }
    });
  }

  if (editImageBtn) {
    editImageBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        const markup = `
      <form class="add-image-form">
    <div class="form-group">
      <label for="recipient-name" class="col-form-label">Image</label>
      <input
        type="file"
        class="form-control image"
        id="recipient-name"
        style="color: black"
        required
      />
    </div>
    <div class="modal-footer">
    <button class="btn btn-primary">Add</button>
  </div>
    </form>
      `;
        openModal(markup);

        const updateImageForm = selectOne(".add-image-form");

        updateImageForm.addEventListener("submit", (e) => {
          e.preventDefault();

          const image = selectOne(".image").files[0];

          const form = new FormData();
          form.append("image", image);
          updateFormData(
            form,
            "/api/v1/admin/gallery",
            btn.value,
            "/admin/gallery"
          );
        });
      });
    });
  }

  if (deleteImageBtn) {
    deleteImageBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        deleteData("/api/v1/admin/gallery", btn.value, "/admin/gallery");
      });
    });
  }

  if (addFeedbackBtn) {
    addFeedbackBtn.addEventListener("click", () => {
      const markup = `
      <form class="add-feedback-form">
      <div class="form-group">
      <label for="recipient-name" class="col-form-label"
        >Title</label
      >
      <input
        type="text"
        class="form-control title"
        id="recipient-name"
        style="color: black"
        required
      />
    </div>
    <div class="form-group">
      <label for="recipient-name" class="col-form-label"
        >Description</label
      >
      <textarea
        type="url"
        class="form-control description"
        id="recipient-name"
        style="color: black"
        required
      ></textarea>
    </div>
    <div class="form-group">
    <label for="recipient-name" class="col-form-label"
      >Author Name</label
    >
    <input
      type="text"
      class="form-control authorName"
      id="recipient-name"
      style="color: black"
      required
    />
  </div>
  <div class="form-group">
  <label for="recipient-name" class="col-form-label"
    >Author Profession</label
  >
  <input
    type="text"
    class="form-control authorProfession"
    id="recipient-name"
    style="color: black"
    required
  />
</div>
    <div class="form-group">
      <label for="recipient-name" class="col-form-label">Author Image</label>
      <input
        type="file"
        class="form-control image"
        id="recipient-name"
        style="color: black"
        required
      />
    </div>
    <div class="modal-footer">
    <button class="btn btn-primary">Add</button>
  </div>
    </form>
      `;
      openModal(markup);

      const addFeedbackForm = selectOne(".add-feedback-form");

      if (addFeedbackForm) {
        addFeedbackForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const title = selectOne(".title").value;
          const description = selectOne(".description").value;
          const authorName = selectOne(".authorName").value;
          const authorProfession = selectOne(".authorProfession").value;
          const image = selectOne(".image").files[0];

          const form = new FormData();
          form.append("title", title);
          form.append("description", description);
          form.append("authorName", authorName);
          form.append("authorProfession", authorProfession);
          form.append("image", image);
          postFormData(form, "/api/v1/admin/feedbacks", "/admin/feedbacks");
        });
      }
    });
  }

  if (editFeedbackBtn) {
    editFeedbackBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        getDataById("/api/v1/admin/feedbacks", btn.value, (curData) => {
          const markup = `
          <form class="add-feedback-form">
          <div class="form-group">
          <label for="recipient-name" class="col-form-label"
            >Title</label
          >
          <input
            type="text"
            class="form-control title"
            id="recipient-name"
            style="color: black"
            value="${curData.title}"
            required
          />
        </div>
        <div class="form-group">
          <label for="recipient-name" class="col-form-label"
            >Description</label
          >
          <textarea
            type="url"
            class="form-control description"
            id="recipient-name"
            style="color: black"
            required
          >${curData.title}</textarea>
        </div>
        <div class="form-group">
        <label for="recipient-name" class="col-form-label"
          >Author Name</label
        >
        <input
          type="text"
          class="form-control authorName"
          id="recipient-name"
          style="color: black"
          value="${curData.authorName}"
          required
        />
      </div>
      <div class="form-group">
      <label for="recipient-name" class="col-form-label"
        >Author Profession</label
      >
      <input
        type="text"
        class="form-control authorProfession"
        id="recipient-name"
        style="color: black"
        value="${curData.authorProfession}"
        required
      />
    </div>
        <div class="form-group">
          <label for="recipient-name" class="col-form-label">Author Image</label>
          <input
            type="file"
            class="form-control image"
            id="recipient-name"
            style="color: black"
          />
        </div>
        <div class="modal-footer">
        <button class="btn btn-primary">Add</button>
      </div>
        </form>
          `;
          openModal(markup);
          const updateFeedbackForm = selectOne(".add-feedback-form");

          updateFeedbackForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const title = selectOne(".title").value;
            const description = selectOne(".description").value;
            const authorName = selectOne(".authorName").value;
            const authorProfession = selectOne(".authorProfession").value;
            const image = selectOne(".image").files[0];

            const form = new FormData();
            form.append("title", title);
            form.append("description", description);
            form.append("authorName", authorName);
            form.append("authorProfession", authorProfession);
            form.append("image", image);
            updateFormData(
              form,
              "/api/v1/admin/feedbacks",
              btn.value,
              "/admin/feedbacks"
            );
          });
        });
      });
    });
  }

  if (deleteFeedbackBtn) {
    deleteFeedbackBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        deleteData("/api/v1/admin/feedbacks", btn.value, "/admin/feedbacks");
      });
    });
  }

  if (enrollForm) {
    enrollForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = selectOne(".ism").value;
      const pillName = selectOne(".dori-nomi").value;
      const phone = selectOne(".telefon").value;

      const data = {
        name,
        pillName,
        phone,
      };

      addEnroll(data, "/api/v1/enrolls");
    });
  }

  if (deleteEnrollBtn) {
    deleteEnrollBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        deleteData("/api/v1/admin/enrolls", btn.value, "/admin/enrolls");
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = selectOne(".contact-name").value;
      const phone = selectOne(".contact-phone").value;
      const message = selectOne(".contact-message").value;

      const data = {
        name,
        phone,
        message,
      };

      addContact(data, "/api/v1/contacts");
    });
  }

  if (deleteContactBtn) {
    deleteContactBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        deleteData("/api/v1/admin/contacts", btn.value, "/admin/contacts");
      });
    });
  }

  if (addAboutBtn) {
    addAboutBtn.addEventListener("click", () => {
      const markup = `
      <form class="add-about-form">
      <div class="form-group">
      <label for="recipient-name" class="col-form-label"
        >Title</label
      >
      <input
        type="text"
        class="form-control title"
        id="recipient-name"
        style="color: black"
        required
      />
    </div>
    <div class="form-group">
      <label for="recipient-name" class="col-form-label"
        >Description</label
      >
      <textarea
        type="url"
        class="form-control description"
        id="recipient-name"
        style="color: black"
        required
      ></textarea>
    </div>
  <div class="form-group">
      <label for="recipient-name" class="col-form-label"
        >Video Link(Copy from You Tube)</label
      >
      <input
        type="url"
        class="form-control video"
        id="recipient-name"
        style="color: black"
        required
      />
    </div>
    <div class="modal-footer">
    <button class="btn btn-primary">Add</button>
  </div>
    </form>
      `;
      openModal(markup);

      const addAboutForm = selectOne(".add-about-form");

      if (addAboutForm) {
        addAboutForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const title = selectOne(".title").value;
          const description = selectOne(".description").value;
          const video = selectOne(".video").value;

          const data = {
            title,
            description,
            video,
          };
          postData(data, "/api/v1/admin/about", "/admin/about");
        });
      }
    });
  }

  if (editAboutBtn) {
    editAboutBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        getDataById("/api/v1/admin", "about", (curData) => {
          const markup = `
          <form class="update-about-form">
          <div class="form-group">
          <label for="recipient-name" class="col-form-label"
            >Title</label
          >
          <input
            type="text"
            class="form-control title"
            id="recipient-name"
            style="color: black"
            value="${curData.title}"
            required
          />
        </div>
        <div class="form-group">
          <label for="recipient-name" class="col-form-label"
            >Description</label
          >
          <textarea
            type="url"
            class="form-control description"
            id="recipient-name"
            style="color: black"
            required
          >${curData.description}</textarea>
        </div>
        <div class="form-group">
      <label for="recipient-name" class="col-form-label"
        >Video Link(Copy from You Tube)</label
      >
      <input
        type="url"
        class="form-control video"
        value="${curData.video}"
        id="recipient-name"
        style="color: black"
        required
      />
    </div>
        <div class="modal-footer">
        <button class="btn btn-primary">Add</button>
      </div>
        </form>
          `;
          openModal(markup);
          const updateAboutForm = selectOne(".update-about-form");

          updateAboutForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const title = selectOne(".title").value;
            const description = selectOne(".description").value;
            const video = selectOne(".video").value;

            const data = {
              title,
              description,
              video,
            };
            updateData(data, "/api/v1/admin", "about", "/admin/about");
          });
        });
      });
    });
  }

  if (updateAdminDetails) {
    updateAdminDetails.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = selectOne(".admin-name").value;
      const email = selectOne(".admin-email").value;

      const data = {
        name,
        email,
      };

      updateData(data, "/api/v1/admin", "updatedetails", "/admin/me");
    });
  }

  if (updatePasswordBtn) {
    updatePasswordBtn.addEventListener("click", () => {
      const markup = `
      <form class="update-password-form">
      <div class="form-group">
      <label for="recipient-name" class="col-form-label"
        >Current Password</label
      >
      <input
        type="password"
        class="form-control currentPassword"
        id="recipient-name"
        style="color: black"
        required
      />
    </div>
    <div class="form-group">
      <label for="recipient-name" class="col-form-label"
        >New Password</label
      >
      <input
        type="password"
        class="form-control newPassword"
        id="recipient-name"
        style="color: black"
        required
      />
    </div>
    <div class="form-group">
      <label for="recipient-name" class="col-form-label"
        >Confirm Password</label
      >
      <input
        type="password"
        class="form-control confirmPassword"
        id="recipient-name"
        style="color: black"
        required
      />
    </div>
    <div class="modal-footer">
    <button class="btn btn-primary">Add</button>
  </div>
    </form>
      `;
      openModal(markup);
      const updatePasswordForm = selectOne(".update-password-form");

      updatePasswordForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const currentPassword = selectOne(".currentPassword").value;
        const newPassword = selectOne(".newPassword").value;
        const confirmPassword = selectOne(".confirmPassword").value;

        const data = {
          currentPassword,
          newPassword,
          confirmPassword,
        };

        if (newPassword.length < 5) {
          return showAlert(
            "password must be at least 5 characters long",
            10,
            "fail"
          );
        }

        if (newPassword !== confirmPassword) {
          return showAlert("confirm password doesn't match", 10, "fail");
        }
        updateData(data, "/api/v1/admin", "updatepassword", "/admin/login");
      });
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logout();
    });
  }

  if (playVideoBtn) {
    playVideoBtn.addEventListener("click", () => {
      let videoUrl = playVideoBtn.getAttribute("data-video");
      console.log(videoUrl);
    });
  }
};
