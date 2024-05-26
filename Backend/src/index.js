import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import cookieSession from "cookie-session";
import { userRoute } from "./routes/userRoute.js";
import { quackRoute } from "./routes/quackRoute.js";
import { connectToDB } from "./models/index.js";
import { commentRoute } from "./routes/commentRoute.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

// // *cookies
const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000;
const isFrontendLocalhost =
  process.env.FRONTEND_URL.startsWith("http://localhost");
const cookieSessionSecret = process.env.COOKIE_SESSION_SECRET;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.set("trust proxy", 1);
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

// *routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/quacks", quackRoute);
app.use("/api/v1/comments", commentRoute);

try {
  await connectToDB();
  app.listen(PORT, () => console.log("Server ready at", PORT));
} catch (error) {
  console.log(error);
  process.exit(1);
}
