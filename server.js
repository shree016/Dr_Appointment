const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/conn");
const userRouter = require("./routes/userRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const appointRouter = require("./routes/appointRoutes");
const notificationRouter = require("./routes/notificationRouter");

const app = express();
const port = process.env.PORT || 5050;

const allowedOrigins = [
  "http://localhost:3000",
  "https://drappointment-production-adca.up.railway.app",
  "https://dr-appointment-62j8-5qcslccfm-shrilaxmis-projects.vercel.app"
];

app.use(express.json());
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// ✅ Define your API routes only
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/appointment", appointRouter);
app.use("/api/notification", notificationRouter);

// ✅ Add a default route for testing
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
