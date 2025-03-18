import mongoose, { Document, Schema } from "mongoose";

const bookSchema = new Schema({
  id: { type: String, required: true, unique: true },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  prompt: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: Array, required: false, default: [] },
  progress: {
    type: String,
    required: true,
    enum: ["pending", "complete", "failed"],
  },
  createdAt: { type: Date, default: Date.now },
});

export const bookModel = mongoose.model("Book", bookSchema);
