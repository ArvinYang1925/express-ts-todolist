// 將你的 userRoutes.ts 文件修改為：
import { Router } from "express";
import { register, login } from "../controllers/userController";

const router = Router();

router.post("/v1/auth/register", register);
router.post("/v1/auth/login", login);

export default router; // 確保正確導出 router 對象
