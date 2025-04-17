import express from "express";
import {  login, userRegister,  venueRegister } from "../controllers/authController.js";

const router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

router.post("/register/admin", async (req, res) => {
    const { fullName, email, password } = req.body;
  
    try {
      // Eyni email varsa, qeydiyyata icazə vermə
      const existingAdmin = await User.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: "Bu email artıq istifadə olunur" });
      }
  
      // Şifrəni hash et
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Yeni admin yarat
      const newAdmin = new User({
        fullName,
        email,
        password: hashedPassword,
        role: "admin", // 📌 Admin rolunu təyin edirik
      });
  
      await newAdmin.save();
  
      // JWT Token yaradıb göndəririk
      const token = jwt.sign({ id: newAdmin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.status(201).json({ token, message: "Admin uğurla qeydiyyatdan keçdi!" });
  
    } catch (error) {
      res.status(500).json({ message: "Server xətası", error });
    }
  });

router.post("/register/person", userRegister);

router.post("/register/venue", venueRegister);

router.post('/login', login)
// router.post("/login/person", userLogin);

// router.post("/login/venue", venueLogin);

export default router;