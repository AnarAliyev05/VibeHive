import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    console.log("Gələn token:", token); // 📌 Tokenin gəlib-gəlmədiyini görmək üçün

    if (!token) {
      return res.status(401).json({ message: "Token yoxdur" });
    }

    // "Bearer" sözünü çıxarmaq
    const tokenWithoutBearer = token.split(" ")[1];
    console.log("Düzgün token:", tokenWithoutBearer); // 📌 "Bearer" olmadan token

    const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = verified;
    
    console.log("Doğrulanan istifadəçi:", verified); // 📌 Token doğrulanırmı?

    next();
  } catch (error) {
    console.error("JWT Xətası:", error);
    res.status(401).json({ message: "Token etibarsızdır" });
  }
};
