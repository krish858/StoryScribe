import { Router } from "express";
import { signup, login } from "../controllers/AuthControllers";

const router = Router();

//@ts-ignore
router.post("/login", login);
//@ts-ignore
router.post("/signup", signup);

export default router;
