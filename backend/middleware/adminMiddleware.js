export const isAdmin = (req, res, next) => {
  console.log("İstifadəçi məlumatı:", req.user); // Token-dən gələn user

  if (!req.user || req.user.role !== "admin") {
    console.log("Admin hüququ yoxdur!");
    return res.status(403).json({ message: "Bu əməliyyatı yerinə yetirmək üçün icazəniz yoxdur" });
  }

  console.log("Admin təsdiqləndi!");
  next();
};