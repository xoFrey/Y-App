import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieSession from "cookie-session";
import { userRoute } from "./routes/userRoute.js";
import { connectToDB } from "./models/index.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(morgan("dev"));
app.use(express.json());

// *routes
app.use("/api/v1/user", userRoute);
// app.use("/api/v1/tweets", tweetRoute);
// app.use("/api/v1/comments", commentRoute)

// // *cookies
const twoMonthsinMS = 5256000000;
const isFrontendLocalhost =
  process.env.FRONTEND_URL.startsWith("http://localhost");
const cookieSessionSecret = process.env.COOKIE_SESSION_SECRET;

app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }));
app.set("trust proxy", 1);
const cookieSessionOptions = {
  name: "session",
  secret: cookieSessionSecret,
  httpOnly: true,
  expires: new Date(Date.now() + twoMonthsinMS),
  sameSite: isFrontendLocalhost ? "lax" : "none",
  secure: isFrontendLocalhost ? false : true,
};
app.use(cookieSession(cookieSessionOptions));

try {
  await connectToDB();
  app.listen(PORT, () => console.log("Server ready at", PORT));
} catch (error) {
  console.log(error);
  process.exit(1);
}
