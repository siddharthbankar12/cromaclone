import Product from "../models/product.schema.js";
import User from "../models/user.schema.js";

// Add a new product
export const AddProduct = async (req, res) => {
  try {
    const { name, price, quantity, category, image, description, brand } =
      req.body.productData;
    const { userId } = req.body;

    if (
      !userId ||
      !name ||
      !price ||
      !quantity ||
      !category ||
      !image ||
      !description ||
      !brand
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    if (user.role !== "seller") {
      return res
        .status(403)
        .json({ success: false, message: "Only sellers can add products." });
    }

    const isProductExist = await Product.findOne({ name });

    if (isProductExist) {
      return res
        .status(400)
        .json({ success: false, message: "Product name already exists." });
    }

    const newProduct = new Product({
      name,
      price,
      quantity,
      category,
      image,
      description,
      brand,
      sellerId: userId,
      originalPrice: price,
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product: newProduct,
    });
  } catch (error) {
    console.error("AddProduct Error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// Get products added by a specific seller
export const AddedProducts = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    const products = await Product.find({ sellerId: userId });

    return res.status(200).json({
      success: true,
      message: "Seller's products fetched successfully.",
      products,
    });
  } catch (error) {
    console.error("AddedProducts Error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// Get all products with filters
export const getAllProducts = async (req, res) => {
  try {
    const { category, brand, price, search } = req.query;

    const filter = {};

    if (category && category !== "All Category") {
      filter.category = { $regex: category, $options: "i" };
    }

    if (brand && brand !== "All Brands") {
      filter.brand = { $regex: brand, $options: "i" };
    }

    if (search) {
      const searchRegex = { $regex: search, $options: "i" };
      filter.$or = [
        { category: searchRegex },
        { brand: searchRegex },
        { name: searchRegex },
      ];
    }

    if (price) {
      if (price === "50000+") {
        filter.price = { $gte: 50000 };
      } else {
        const priceRange = price.split("-");
        if (priceRange.length === 2) {
          const min = Number(priceRange[0]);
          const max = Number(priceRange[1]);
          if (!isNaN(min) && !isNaN(max)) {
            filter.price = { $gte: min, $lte: max };
          }
        }
      }
    }

    const products = await Product.find(filter);

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully.",
      products,
    });
  } catch (error) {
    console.error("AllProducts Error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// Get data of a single product
export const SingleProductData = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    const product = await Product.findById(productId).populate(
      "sellerId",
      "-password"
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Product data fetched successfully.",
      productData: product,
    });
  } catch (error) {
    console.error("SingleProductData Error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
