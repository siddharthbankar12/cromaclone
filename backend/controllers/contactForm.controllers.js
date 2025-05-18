import ContactMessage from "../models/contactMessage.schema.js";

export const ContactRequest = async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });
    }
    if (!message) {
      return res
        .status(400)
        .json({ success: false, message: "Message is required." });
    }

    const saveRequest = new ContactMessage({
      email,
      message,
    });

    await saveRequest.save();

    return res.status(201).json({
      success: true,
      message: "Thanks for reaching out. We'll contact you soon.",
    });
  } catch (error) {
    console.error("Contact Requests API error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
