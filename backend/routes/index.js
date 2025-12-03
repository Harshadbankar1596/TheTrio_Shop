import express from "express";
import userRoutes from "./user.route.js";
import adminRouter from "./admin.route.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/admin", adminRouter);

export default router;
