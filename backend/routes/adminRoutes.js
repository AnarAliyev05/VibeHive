import express from "express";
import User from "../models/User.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Bütün istifadəçiləri göstər (Admin üçün)
router.get("/users", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error });
  }
});

// İstifadəçini sil (Admin üçün)
router.delete("/users/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "İstifadəçi tapılmadı" });
    res.status(200).json({ message: "İstifadəçi silindi" });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error });
  }
});

export default router;
