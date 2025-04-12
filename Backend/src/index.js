import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { userRoute } from "./routes/userRoute.js";
import { quackRoute } from "./routes/quackRoute.js";
import { commentRoute } from "./routes/commentRoute.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

// Explicitly handle CORS preflight requests
app.options(
  "*",
  cors({
    origin: "https://y-app-zq2w.vercel.app",
    credentials: true,
  }),
);

// Use CORS middleware (should be first)
app.use(
  cors({
    origin: "https://y-app-zq2w.vercel.app",
    credentials: true,
  }),
);

// Trust proxy for cookies if deploying on Vercel
app.set("trust proxy", 1);

const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000;
const isFrontendLocalhost =
  process.env.FRONTEND_URL.startsWith("http://localhost");
const cookieSessionSecret = process.env.COOKIE_SESSION_SECRET;

const cookieSessionOptions = {
  name: "session",
  secret: cookieSessionSecret,
  httpOnly: true,
  expires: new Date(Date.now() + twoWeeksInMs),
  sameSite: isFrontendLocalhost ? "lax" : "none",
  secure: isFrontendLocalhost ? false : true,
};

app.use(cookieSession(cookieSessionOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("uploads"));

const upload = multer({ dest: "./uploads" });
app.post("/api/v1/files/upload", upload.single("pictures"), (req, res) => {
  res.json({ imgUrl: req.file.filename });
});

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/quacks", quackRoute);
app.use("/api/v1/comments", commentRoute);

try {
  await mongoose.connect(process.env.MONGO_URL, { dbName: "Y-App" });
  app.listen(PORT, () => console.log("Server ready at", PORT));
} catch (error) {
  console.log(error);
  process.exit(1);
}
