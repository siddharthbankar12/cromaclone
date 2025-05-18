import { model, Schema } from "mongoose";

const contactMessageSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContactMessage = model("contact-message", contactMessageSchema);

export default ContactMessage;
