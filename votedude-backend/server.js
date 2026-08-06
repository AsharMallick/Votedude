const express = require("express");
const { app } = require("./app");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");
const errorMiddleware = require("./middlewares/Error");

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

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
