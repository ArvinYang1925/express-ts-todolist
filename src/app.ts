import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/db";
import todoRoutes from "./routes/todoRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/todos", todoRoutes); // 加上 Todo 路由

app.get("/", (req, res) => {
  res.send("Hello, MeowTodo Backend!");
});

const PORT = process.env.PORT || 3000;

// 放在所有路由後面，初始化前：404 處理
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "無此路由",
  });
});

AppDataSource.initialize()
  .then(() => {
    console.log("📦 DB Connected!");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
