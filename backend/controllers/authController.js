import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/User.js'

export const userRegister = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Bütün sahələr doldurulmalıdır" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu email artıq istifadə olunur" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword, role: "person" });

    await newUser.save();
    res.status(201).json({ message: "İnsan qeydiyyatı uğurlu oldu" });
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error });
  }
}
export const venueRegister = async (req, res) => {
  const { fullName, email, password, address, phone, workingHours } = req.body;

  if (!fullName || !email || !password || !address || !phone || !workingHours) {
    return res.status(400).json({ message: "Bütün sahələr doldurulmalıdır" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu email artıq istifadə olunur" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role: "venue",
      address,
      phone,
      workingHours
    });

    await newUser.save();
    res.status(201).json({ message: "Mekan qeydiyyatı uğurlu oldu" });
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error });
  }
}

export const login =  async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ İstifadəçini tapırıq (insan və ya məkan)
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı" });
    }

    // 2️⃣ Şifrəni yoxlayırıq
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Yanlış şifrə" });
    }

    // 3️⃣ Token yaradılır (rolu da əlavə edirik)
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Tokenin içində istifadəçinin rolu da var
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4️⃣ Cavab qaytarılır
    res.status(200).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role, // Rolu qaytarırıq ki, frontend yönləndirmə edə bilsin
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error });
  }
};


// export const userLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 📌 Email ilə istifadəçini tapırıq
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "İstifadəçi tapılmadı" });
//     }

//     // 📌 Şifrəni yoxlayırıq
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Yanlış şifrə" });
//     }

//     // 📌 Token yaradılır
//     const token = jwt.sign(
//       { id: user._id, role: user.role }, // İstifadəçinin ID və rolunu tokenə əlavə edirik
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" } // Token 7 gün etibarlı olacaq
//     );

//     res.status(200).json({ token, user }); // 📌 Token və istifadəçi məlumatlarını qaytarırıq
//   } catch (error) {
//     res.status(500).json({ message: "Server xətası", error });
//   }
// }
// export const venueLogin = async(req,res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: "Email və şifrə tələb olunur" });
//   }

//   try {
//     const user = await User.findOne({ email }).select("+password");
//     if (!user || user.role !== "venue") {
//       return res.status(404).json({ message: "İstifadəçi tapılmadı və ya yanlış role" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Yanlış şifrə" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({ token, user });
//   } catch (error) {
//     res.status(500).json({ message: "Server xətası", error });
//   }
// }