import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  userId: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  nickName: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: false,
  },
  provider: {
    type: String,
    required: true,
    default: "local",
  },
});

export default model("User", UserSchema);
