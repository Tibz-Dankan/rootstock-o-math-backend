const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");
const keepActiveRoute = require("./routes/activeRoute");
const convertRoute = require("./routes/convertRoute");
const { errorHandler } = require("./utils/errorHandler");

dotenv.config();

const startServer = async () => {
  const app = express();
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (process.env.NODE_ENV === "production") {
    app.use(cors({ origin: "prod client url" }));
  } else {
    app.use(cors({ origin: "http://localhost:5173" }));
  }

  app.use(keepActiveRoute);
  app.use("/api/v1", convertRoute);

  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
