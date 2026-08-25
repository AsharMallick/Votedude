const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const user = require("./routes/user.routes");
const news = require("./routes/news.routes");
const event = require("./routes/event.routes");
const sport = require("./routes/sport.routes");
const candidate = require("./routes/candidate.routes");
const issue = require("./routes/issue.routes");
const law = require("./routes/law.routes");
const discuss = require("./routes/discuss.routes");
const poll = require("./routes/poll.routes");
const petition = require("./routes/petition.routes");
const notification = require("./routes/notification.routes");
const admin = require("./routes/admin.routes");
const googleAuthRoutes = require("./routes/googleAuth.routes");
const errorMiddleware = require("./middlewares/Error");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://votedude.vercel.app",
  "https://votedude.org",
  "https://www.votedude.org",
];

// Optional: also read from env (comma-separated)
if (process.env.FRONTEND_URLS) {
  process.env.FRONTEND_URLS.split(",").forEach((url) => {
    const trimmed = url.trim();
    if (trimmed && !allowedOrigins.includes(trimmed)) {
      allowedOrigins.push(trimmed);
    }
  });
}

// Keep single FRONTEND_URL support too
if (
  process.env.FRONTEND_URL &&
  !allowedOrigins.includes(process.env.FRONTEND_URL)
) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman / server requests with no Origin header
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.get("/", (_, res) => {
  res.json({
    message: "THIS IS MY VOTEDUDE SERVER",
  });
});

app.use("/api/v1", user);
app.use("/api/v1", googleAuthRoutes);
app.use("/api/v1", news);
app.use("/api/v1", event);
app.use("/api/v1", sport);
app.use("/api/v1", candidate);
app.use("/api/v1", issue);
app.use("/api/v1", law);
app.use("/api/v1", discuss);
app.use("/api/v1", poll);
app.use("/api/v1", petition);
app.use("/api/v1", notification);
app.use("/api/v1", admin);

app.use(errorMiddleware);

module.exports = app;