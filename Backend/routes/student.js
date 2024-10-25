import express from "express";
import Student from "../models/Student.js";
import bcrypt from "bcrypt";
const router = express.Router();
import { verifyAdmin } from "./auth.js";

router.post("/register",verifyAdmin, async (req, res) => {
  try {
    const { username, password, rollno, grade } = req.body;
    const student = await Student.findOne({ username });
    if (student) {
      res.json({ message: "Student is Registered" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({
      username,
      password: hashPassword,
      rollno: rollno,
      grade,
    });
    await newStudent.save();
    return res.json({ registered: true });
  } catch (error) {
    res.json({ message: "Error in registering Student" });
  }
});


export {router as StudentRouter}