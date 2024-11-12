const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const router = require("./router");
const { uploader } = require("./uploader");
const logger = require("./winston");

// const { errorHandler } = require("./util/errorHandler");

const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(morgan(":method :status :url :response-time ms", { stream: logger.stream }));
  app.use(express.json());
  app.use(router);
  uploader();
  app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
  });
  // app.use(errorHandler);

  return app;
};

module.exports = { createApp };
