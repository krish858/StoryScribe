import { Router } from "express";
import {
  create,
  getBooksById,
  getBookById,
} from "../controllers/BookingControllers";

const router = Router();

//@ts-ignore
router.post("/create", create);
//@ts-ignore
router.get("/getbooks/:id", getBooksById);
//@ts-ignore
router.get("/getbook/:id", getBookById);

export default router;
