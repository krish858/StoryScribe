import { Request, Response } from "express";
import { bookModel } from "../models/Book";
import genId from "../utils/genId";
import { genBookData, genChapter } from "./Ai_agent";

export async function create(req: Request, res: Response) {
  const { prompt, ChNo, Chlen, user_id } = req.body;
  try {
    const id = genId(16);
    const BookData = genBookData(prompt, ChNo, Chlen);
    if ((await BookData).status === "error") {
      throw new Error("Error in generating book data");
    }
    const newBook = new bookModel({
      id,
      creatorId: user_id,
      progress: "pending",
      prompt,
      title: (await BookData).data.title,
    });
    await newBook.save();
    res.json({
      msg: "Book created",
      id,
    });
    const Book = genChapter((await BookData).data.description, ChNo, Chlen, id);
    if ((await Book).status === "error") {
      newBook.progress = "failed";
      await newBook.save();
    } else {
      newBook.progress = "complete";
      await newBook.save();
    }
    return;
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getBooksById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const book = await bookModel.find({ creatorId: id });
    return res.json({
      book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

export async function getBookById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const book = await bookModel.findOne({ id });
    return res.json({
      book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}
