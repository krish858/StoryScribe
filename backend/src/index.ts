import express from "express";
import cors from "cors";
import dbconnect from "./utils/dbconnect";
import AuthRouter from "./routes/AuthRoutes";
import BookRouter from "./routes/BookRoutes";

const app = express();
const port = 3000;

dbconnect();

app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/book", BookRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
