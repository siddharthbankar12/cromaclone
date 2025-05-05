import Product from "../models/product.schema.js";

export const allProducts0 = async (req, res) => {
  try {
    const products = await Product.find({});

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

export const updateProductQuantity0 = async (req, res) => {
  const { productId, action } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (action === "increase") {
      product.quantity += 1;
    } else if (action === "decrease" && product.quantity > 1) {
      product.quantity -= 1;
    }

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

export const Discount0 = async (req, res) => {
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
