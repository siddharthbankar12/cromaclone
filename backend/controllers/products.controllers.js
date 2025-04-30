import Product from "../models/product.schema.js";
import User from "../models/user.schema.js";

export const AddProduct = async (req, res) => {
  try {
    const { name, price, quantity, category, image } = req.body.productData;
    const { userId } = req.body;

    const isUserExists = await User.findById(userId);

    if (!isUserExists) {
      return res.json({ success: false, message: "User not found .." });
    }

    console.log(isUserExists);

    if (isUserExists.role != "seller") {
      return res.json({
        success: false,
        message: "You are not seller to add product ..",
      });
    }

    const isProductExist = await Product.findOne({ name });

    if (isProductExist) {
      return res.json({
        success: false,
        message: "Product name already exist, please use another one ..",
      });
    }

    const newProduct = Product({
      name,
      price,
      quantity,
      category,
      image,
      userId,
    });

    await newProduct.save();

    return res.json({
      success: true,
      message: "Product Successfully Created ..",
    });
  } catch (error) {
    console.log(error, "error in add product api call ..");
    return res.json({ success: false, message: error });
  }
};

export const AddedProducts = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User id is required .." });
    }

    const products = await Product.find({ userId: userId });

    return res.json({
      products: products,
      success: true,
      message: "Products successfully fetch ..",
    });
  } catch (error) {
    console.log(error, "error in added products api call ..");
    return res.json({ success: false, message: error });
  }
};

export const AllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    return res.json({
      products: products,
      success: true,
      message: "Products successfully fetch ..",
    });
  } catch (error) {
    console.log(error, "error in all products api call ..");
    return res.json({ success: false, message: error });
  }
};

export const SingleProductData = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.json({
        success: false,
        message: "Products id is required ..",
      });
    }

    const product = await Product.findById(productId).populate("userId");

    return res.json({
      productData: product,
      success: true,
      message: "Products successfully fetch ..",
    });
  } catch (error) {
    console.log(error, "error in single product data  api call ..");
    return res.json({ success: false, message: error });
  }
};
