const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const compression = require("compression");
const { fileFilter, fileStorage } = require("./utils/file");
const errorHandler = require("./middleware/error");

// require routes
const homeRoute = require("./routes/home");
const adminRoute = require("./routes/admin");
const slidesRoute = require("./routes/slide");
const galleryRoute = require("./routes/gallery");
const feedbackRoute = require("./routes/feedback");
const enrollRoute = require("./routes/enroll");
const contactRoute = require("./routes/contact");
const aboutRoute = require("./routes/about");
const errorRoute = require("./routes/error");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to Dabase
connectDB();

const app = express();

// View engine
app.set("view engine", "ejs");
app.set("views", "views");

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());

// Implement Cors
app.use(cors());

// Set Security HTTP headers
// app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 1000,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());
//
app.use(compression());

app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public", "uploads"))
);
app.use(express.static(path.join(__dirname, "public")));

// // File uploads
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// // Dev Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(homeRoute);
app.use(adminRoute);
app.use(slidesRoute);
app.use(galleryRoute);
app.use(feedbackRoute);
app.use(enrollRoute);
app.use(contactRoute);
app.use(aboutRoute);
app.use(errorRoute);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}!`);
});

// Handler unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
