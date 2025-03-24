import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./database.js";
import router from "./routes/routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api", router);

const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Server failed to start due to database connection error");
  });
