import { Router } from "express";
import { ContactRequest } from "../controllers/contactForm.controllers.js";

const contactFormRouters = Router();

contactFormRouters.post("/contact-request", ContactRequest);

export default contactFormRouters;
