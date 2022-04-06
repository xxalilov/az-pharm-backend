const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const morgan = require("morgan");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to Dabase
connectDB();

// Routes
const homeRoute = require("./routes/home");
const adminRoute = require("./routes/admin");
const slidesRoute = require("./routes/slide");
const errorRoute = require("./routes/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// Dev Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(homeRoute);
app.use(adminRoute);
app.use(slidesRoute);
app.use(errorRoute);

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
