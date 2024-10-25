import express from "express";
import Admin from "../models/Admin.js";
import Student from "../models/Student.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (role === "admin") {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.json({ message: "Admin not Registered" });
      }
      const validPassword = await bcrypt.compare(password, admin.password);
      if (!validPassword) {
        return res.json({ message: "Wrong Password" });
      }
      const token = jwt.sign(
        { username: admin.username, role: "admin" },
        process.env.JWT_KEY
      );
      // when httpOnly is True we cannot access our cookie through javascript
      res.cookie("token", token, { httpOnly: true, secure: true });
      return res.json({ login: true, role: "admin" });
    } else if (role === "student") {
      const student = await Student.findOne({ username });
      if (!student) {
        return res.json({ message: "Student not Registered" });
      }
      const validPassword = await bcrypt.compare(password, student.password);
      if (!validPassword) {
        return res.json({ message: "Wrong Password" });
      }
      const token = jwt.sign(
        { username: student.username, role: "student" },
        process.env.JWT_STUDENT_KEY
      );
      // when httpOnly is True we cannot access our cookie through javascript
      res.cookie("token", token, { httpOnly: true, secure: true });
      return res.json({ login: true, role: "student" });
    } else {
    }
  } catch (error) {
    res.json(error);
  }
});

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid Admin" });
  } else {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid token" });
      } else {
        (req.username = decoded.username), (req.role = decoded.role);
        next();
      }
    });
  }
};



const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({message : "Invalid User"})
    } else {
        jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
            if(err) {
                jwt.verify(token, process.env.JWT_STUDENT_KEY, (err, decoded) => {
                    if(err) {
                        return res.json({message: "Invalid token"})
                    } else {
                        req.username = decoded.username;
                        req.role = decoded.role;
                        next()
                    }
                })
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next()
            }
        })
    }
}

router.get('/verify',verifyUser, (req, res) => {
    return res.json({login: true, role: req.role})
})

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ logout: true });
});

export { router as AdminRouter, verifyAdmin };
