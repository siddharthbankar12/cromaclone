import ContactMessage from "../models/contactMessage.schema.js";
import User from "../models/user.schema.js";

// crete contact request
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

// get contact request
export const getContactRequest = async (req, res) => {
  try {
    const { adminId } = req.body;

    if (!adminId) {
      return res
        .status(400)
        .json({ success: false, message: "Admin Id is required." });
    }

    const isAdminExist = await User.findById(adminId);

    if (!isAdminExist) {
      return res
        .status(400)
        .json({ success: false, message: "Admin Id is invalid." });
    }

    const requests = await ContactMessage.find();

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully.",
      requestData: requests,
    });
  } catch (error) {
    console.error("Get Contact Requests API error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
