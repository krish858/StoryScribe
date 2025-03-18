import mongoose, { Document, Schema } from "mongoose";

interface UsersInterface extends Document {
  username: string;
  email: string;
  password: string;
}

const usersSchema: Schema = new Schema<UsersInterface>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model<UsersInterface>("User", usersSchema);
