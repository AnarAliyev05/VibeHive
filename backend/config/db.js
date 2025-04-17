import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB bağlantısı uğurla quruldu");
  } catch (error) {
    console.error("MongoDB bağlantı xətası:", error);
    process.exit(1);
  }
};

export default connectDB;