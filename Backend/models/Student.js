import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  rollno: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  grade: { type: String },
});

export default mongoose.model("Student", studentSchema);
