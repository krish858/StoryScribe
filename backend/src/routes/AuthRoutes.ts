import { Router } from "express";
import { signup, login, verify } from "../controllers/AuthControllers";

const router = Router();

//@ts-ignore
router.post("/login", login);
//@ts-ignore
router.post("/signup", signup);
//@ts-ignore
router.get("/verify", verify);

export default router;
