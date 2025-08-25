import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./db/connectionDb.js";
import { errorHandler } from "../server/middleware/errorHandler.js";

// Routes
import authRoutes from "../server/routes/auth.routes.js";
import donationRoutes from "../server/routes/donations.js";
import requestRoutes from "../server/routes/requests.js";
import userRoutes from "../server/routes/users.js";
import adminRoutes from "../server/routes/simple-admin.js";
import notificationRoutes from "../server/routes/notifications.js";
import uploadRoutes from "../server/routes/upload.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.json({ message: "Donation Platform API" }));
app.use("/auth", authRoutes);
app.use("/donations", donationRoutes);
app.use("/requests", requestRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/notifications", notificationRoutes);
app.use("/upload", uploadRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5050;

try {
  await connectDB();
  app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
} catch (error) {
  console.error("Failed to start server:", error);
  process.exit(1);
}
