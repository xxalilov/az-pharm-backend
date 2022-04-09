const fs = require("fs");
const multer = require("multer");

exports.fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

exports.fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// exports.videoFileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "video/gif" ||
//     file.mimetype === "video/mp4" ||
//     file.mimetype === "video/ogg" ||
//     file.mimetype === "video/wmv" ||
//     file.mimetype === "video/x-flv" ||
//     file.mimetype === "video/avi" ||
//     file.mimetype === "video/webm" ||
//     file.mimetype === "video/mkv" ||
//     file.mimetype === "video/avchd" ||
//     file.mimetype === "video/mov"
//   ) {
//     cb(null, true);
//   } else {
//     null, false;
//   }
// };

exports.deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (!err) {
      return console.log("Deleted File!");
    }
    console.log("File couldn't delete");
  });
};
