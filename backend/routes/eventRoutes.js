import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createEvent, getVenueEvents, joinEvent } from "../controllers/eventController.js";
import Event from "../models/Event.js";
const router = express.Router();


router.post("/create", verifyToken, createEvent);
router.post("/:eventId/join", verifyToken, joinEvent);
router.get("/attendees/:eventId", async (req, res) => {
    try {
      const { eventId } = req.params;
  
      // Tədbiri tapırıq və iştirakçıları (attendees) əldə edirik
      const event = await Event.findById(eventId).populate("attendees", "fullName email");
  
      if (!event) {
        return res.status(404).json({ message: "Tədbir tapılmadı" });
      }
  
      // İştirakçıları göndəririk
      res.status(200).json({ attendees: event.attendees });
  
    } catch (error) {
      console.error("Server xətası:", error);
      res.status(500).json({ message: "Server xətası", error });
    }
  });
  
router.get("/my-events", verifyToken, getVenueEvents);
export default router;