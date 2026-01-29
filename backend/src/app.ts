import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";
import privacyRoutes from "./routes/privacy";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/privacy", privacyRoutes);

export default app;
