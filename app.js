require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");

const mainRouter = require("./routes/index");
const { NotFoundError } = require("./utils/errors/errors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");
const apiLimiter = require("./utils/rateLimiter");

const app = express();
const { PORT = 3002, MONGO_URL } = process.env;

// Mongoose connection
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to DB news_explorer"))
  .catch(console.error);

// ----- Security -----
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: [
          "'self'",
          "https://alex-manis.github.io",
          "https://news-backend-i95y.onrender.com",
        ],
      },
    },
    crossOriginResourcePolicy: false,
  })
);

// ----- CORS -----
const allowedOrigins = [
  "http://localhost:3000",
  "https://alex-manis.github.io",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

// ----- Rate limiter -----
app.use("/api/", apiLimiter);

// ----- Middleware -----
app.use(express.json());
app.use(requestLogger);

// ----- Routes -----
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use("/", mainRouter);

// ----- Error logging -----
app.use(errorLogger);

// ----- 404 Not Found -----
app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

// ----- Celebrate errors -----
app.use(errors());

// ----- Central error handler -----
app.use(errorHandler);

// ----- Server start -----
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
