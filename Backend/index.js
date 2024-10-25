import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { AdminRouter } from "./routes/auth.js";
import { StudentRouter } from "./routes/student.js";
import { bookRouter } from "./routes/book.js";
import Student from "./models/Student.js";
import Admin from "./models/Admin.js";
import Book from "./models/Book.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/auth", AdminRouter);
app.use("/student", StudentRouter);
app.use("/book", bookRouter);

mongoose.connect("mongodb://localhost:27017/bookstore");

app.get('/dashboard', async (req, res) => {
  try {
      const student = await Student.countDocuments()
      const admin = await Admin.countDocuments()
      const book = await Book.countDocuments()
      return res.json({ok: true, student, book, admin})
  } catch(err) {
      return res.json(err)
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
