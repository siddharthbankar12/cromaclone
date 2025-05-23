import Order from "../models/order.schema.js";
import Product from "../models/product.schema.js";
import User from "../models/user.schema.js";
import jwt from "jsonwebtoken";

//all products
export const allProducts0 = async (req, res) => {
  try {
    const products = await Product.find({}).populate("sellerId");

    return res.status(200).json({
      success: true,
      message: "All products fetched successfully.",
      products,
    });
  } catch (error) {
    console.error("All Products API error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

//get all orders
export const getAllOrders0 = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("products.productId");

    return res.status(200).json({
      success: true,
      message: "All orders fetched successfully.",
      orders,
    });
  } catch (error) {
    console.error("All Orders API error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// update product quantity
export const updateProductQuantity0 = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity. Must be an integer greater than 0.",
      });
    }

    product.quantity = quantity;
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product quantity updated successfully!",
    });
  } catch (error) {
    console.error("Error updating product quantity:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// apply discount
export const discount0 = async (req, res) => {
  try {
    const { productId, discountPercentage } = req.body;

    if (!productId || discountPercentage === undefined) {
      return res.status(400).json({
        success: false,
        message: "Invalid input.",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    if (!product.originalPrice) {
      product.originalPrice = product.price;
    }

    const discountedPrice =
      product.originalPrice * (1 - discountPercentage / 100);
    product.price = parseFloat(discountedPrice.toFixed(2));
    product.discountPercentage = discountPercentage;

    await product.save();

    return res.json({
      success: true,
      message: "Discount applied successfully.",
      product,
    });
  } catch (error) {
    console.error("Discount API error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// delete product
export const deleteProduct0 = async (req, res) => {
  const { productId } = req.body;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.json({ success: true, message: "Product successfully deleted" });
  } catch (error) {
    console.error("Delete Product API error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// user management
export const usersManagement0 = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized. No token provided." });
    }

    try {
      jwt.verify(token, process.env.TOKENSECRETKEY);
    } catch (err) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid token." });
    }

    const { action, userId } = req.body;

    if (action === "delete" && userId) {
      await User.findByIdAndDelete(userId);
      const usersData = await User.find({ role: { $in: ["seller", "user"] } });
      return res.status(200).json({
        success: true,
        message: "User deleted successfully.",
        usersData,
      });
    }

    const usersData = await User.find({ role: { $in: ["seller", "user"] } });
    return res.status(200).json({
      success: true,
      message: "User data fetched successfully.",
      usersData,
    });
  } catch (error) {
    console.error("Error in usersManagement0:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
