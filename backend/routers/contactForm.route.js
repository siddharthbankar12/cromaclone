import { Router } from "express";
import {
  ContactRequest,
  getContactRequest,
} from "../controllers/contactForm.controllers.js";

const contactFormRouters = Router();

contactFormRouters.post("/contact-request", ContactRequest);
contactFormRouters.post("/get-contact-request", getContactRequest);

export default contactFormRouters;
