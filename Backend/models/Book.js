import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  imageurl: { type: String, required: true },
});

export default mongoose.model("Book", bookSchema);
