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

// ✅ allowed frontend URLs
const allowedOrigins = [
  "http://localhost:3000",
  "https://drappointment-production-adca.up.railway.app",
  "https://dr-appointment-62j8-5qcslccfm-shrilaxmis-projects.vercel.app",
  "https://dr-appointment-62j8-2x58sdyjh-shrilaxmis-projects.vercel.app",
  "https://dr-appointment-62j8.vercel.app",
  "https://dr-appointment-62j8-aeu532rze-shrilaxmis-projects.vercel.app",
  "https://dr-appointment-62j8-cjnj2myv0-shrilaxmis-projects.vercel.app"
];

// ✅ proper CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(express.json());

// ✅ API routes
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/appointment", appointRouter);
app.use("/api/notification", notificationRouter);

// ✅ Default test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
