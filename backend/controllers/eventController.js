import Event from "../models/Event.js";

// 🟢 Yeni Event Yarat (yalnız venue-lar üçün)
export const createEvent = async (req, res) => {
  try {
    // 🔴 Yalnız mekanlar event yarada bilər
    if (req.user.role !== "venue") {
      return res.status(403).json({ message: "Yalnız mekanlar tədbir yarada bilər" });
    }

    const { title, description, date, location } = req.body;

    // 🔴 Bütün sahələr dolu olmalıdır
    if (!title || !description || !date || !location) {
      return res.status(400).json({ message: "Bütün məlumatlar tələb olunur" });
    }

    // 🟢 Yeni event yaradırıq
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      venue: req.user.id, // 📌 Tədbiri yaradan mekanın ID-si
    });

    // 📌 MongoDB-yə yadda saxlayırıq
    await newEvent.save();
    
    res.status(201).json({ message: "Tədbir uğurla yaradıldı", event: newEvent });
  } catch (error) {
    console.error("Event yaratma xətası:", error);
    res.status(500).json({ message: "Server xətası", error });
  }
};
export const getVenueEvents = async (req, res) => {
    try {
      // 🔴 Yalnız mekanlar öz tədbirlərini görə bilər
      if (req.user.role !== "venue") {
        return res.status(403).json({ message: "Yalnız mekanlar öz tədbirlərinə baxa bilər" });
      }
  
      // 📌 İstifadəçinin yaratdığı tədbirləri tapırıq
      const events = await Event.find({ venue: req.user.id });
  
      res.status(200).json({ message: "Sizin tədbirləriniz", events });
    } catch (error) {
      console.error("Eventləri gətirərkən xəta:", error);
      res.status(500).json({ message: "Server xətası", error });
    }
  };
  export const joinEvent = async (req, res) => {
    try {
      const { eventId } = req.params;
  
      // 🔴 Yalnız insanlar tədbirə qoşula bilər (mekanlar yox)
      if (req.user.role !== "person") {
        return res.status(403).json({ message: "Yalnız istifadəçilər tədbirə qoşula bilər." });
      }
  
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Tədbir tapılmadı." });
      }
  
      // 🔴 Əgər istifadəçi artıq tədbirə qoşulubsa, ikinci dəfə qoşula bilməz
      if (event.attendees.includes(req.user.id)) {
        return res.status(400).json({ message: "Siz artıq bu tədbirə qoşulmusunuz." });
      }
  
      // 📌 İstifadəçini tədbir iştirakçıları siyahısına əlavə edirik
      event.attendees.push(req.user.id);
      await event.save();
  
      res.status(200).json({ message: "Tədbirə uğurla qoşuldunuz.", event });
    } catch (error) {
      console.error("Tədbirə qoşulma xətası:", error);
      res.status(500).json({ message: "Server xətası", error });
    }
  };