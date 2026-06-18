import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import cookieParser from "cookie-parser";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "PayRecon Backend Running",
  });
});

export default app;