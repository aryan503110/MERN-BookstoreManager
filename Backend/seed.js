import express from "express";
import Admin from "./models/Admin.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/bookstore");

async function AdminAccount() {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hashpassword = await bcrypt.hash("adminpassword", 10);
      const newAdmin = new Admin({
        username: "admin",
        password: hashpassword,
      });
      await newAdmin.save();
      console.log("Admin Created");
    } else {
      console.log("Account Already Exist");
    }
  } catch (error) {
    console.log(error);
  }
}

AdminAccount();
