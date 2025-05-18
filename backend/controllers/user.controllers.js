import User from "../models/user.schema.js";
import Product from "../models/product.schema.js";
import Cart from "../models/cart.schema.js";
import Order from "../models/order.schema.js";
import WishList from "../models/wishlist.schema.js";

export const AddToCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    if (!userId || !productId) {
      return res.json({
        success: false,
        message: "User and Product are required",
      });
    }

    const isUserExist = await User.findById(userId);
    if (!isUserExist) {
      return res.json({ success: false, message: "User not found" });
    }

    const isProductExist = await Product.findById(productId);
    if (!isProductExist) {
      return res.json({ success: false, message: "Product not found" });
    }

    if (isProductExist.quantity <= 1) {
      return res.json({
        success: false,
        message: "Product is out of stock",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (cart) {
      const existingProduct = cart.products.find(
        (p) => p.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ productId, quantity: 1 });
      }

      await cart.save();
    } else {
      await Cart.create({
        userId,
        products: [{ productId, quantity: 1 }],
      });
    }

    return res.json({ success: true, message: "Product added to cart" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};

export const GetCartProducts = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "UserId required" });
    }

    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart || cart.products.length === 0) {
      return res.json({ success: true, products: [], totalPrice: 0 });
    }

    let total = 0;
    const formattedProducts = cart.products.map((item) => {
      total += item.productId.price * item.quantity;
      return {
        ...item.productId.toObject(),
        quantity: item.quantity,
      };
    });

    return res.json({
      success: true,
      products: formattedProducts,
      totalPrice: total,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};

export const UpdateCartProductQuantity = async (req, res) => {
  try {
    const { userId, productId, action } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({ success: false, message: "Cart not found" });
    }

    const product = cart.products.find(
      (p) => p.productId.toString() === productId
    );

    if (!product) {
      return res.json({ success: false, message: "Product not in cart" });
    }

    if (action === "increase") {
      product.quantity += 1;
    } else if (action === "decrease") {
      if (product.quantity > 1) {
        product.quantity -= 1;
      }
    }

    await cart.save();
    return res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};

export const DeleteCartProduct = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true }
    );

    if (!cart) {
      return res.json({ success: false, message: "Cart not found" });
    }

    return res.json({ success: true, message: "Product removed from cart" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};

export const CheckOut = async (req, res) => {
  try {
    const { userId, products, userAddress } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User is required" });
    }
    if (!userAddress) {
      return res.json({ success: false, message: "Address is required" });
    }
    if (!products || products.length == 0) {
      return res.json({ success: false, message: "Products are required" });
    }

    const isUserExist = await User.findById(userId);
    if (!isUserExist) {
      return res.json({ success: false, message: "User not found" });
    }

    let allProducts = [];
    let totalPrice = 0;

    for (let i = 0; i < products.length; i++) {
      const { _id, quantity } = products[i];

      const product = await Product.findById(_id);
      if (!product) {
        return res.json({
          success: false,
          message: `Product with ID ${_id} not found`,
        });
      }

      if (product.quantity < quantity) {
        return res.json({
          success: false,
          message: `Insufficient stock for product ${product.name}`,
        });
      }

      product.quantity -= quantity;
      await product.save();

      allProducts.push({ productId: _id, quantity });
      totalPrice += product.price * quantity;
    }

    const newOrder = new Order({
      userId,
      products: allProducts,
      price: totalPrice,
      orderAdd: userAddress,
    });

    await newOrder.save();

    await Cart.findOneAndUpdate({ userId }, { products: [] });

    return res.json({
      success: true,
      message: "Order successful, you'll get your products delivered soon",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};

export const BuyNow = async (req, res) => {
  try {
    const { userId, product, userAddress } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User is required" });
    }
    if (!userAddress) {
      return res.json({ success: false, message: "Address is required" });
    }
    if (!product) {
      return res.json({ success: false, message: "Product are required" });
    }

    const isUserExist = await User.findById(userId);
    if (!isUserExist) {
      return res.json({ success: false, message: "User not found" });
    }

    const isProductExist = await Product.findById(product._id);
    if (!isProductExist) {
      return res.json({ success: false, message: "Product not found" });
    }

    if (isProductExist.quantity <= 1) {
      return res.json({
        success: false,
        message: "Product is out of stock",
      });
    }

    let singleProduct = [{ productId: product._id, quantity: 1 }];

    const newOrder = Order({
      userId,
      products: singleProduct,
      price: product.price,
      orderAdd: userAddress,
    });

    await newOrder.save();

    await Cart.findOneAndUpdate({ userId }, { products: [] });

    return res.json({
      success: true,
      message: "Order Successful, you'll get product delivered soon",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};

export const GetOrderHistory = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.json({ success: false, message: "User not found" });
    }
    const ordersUserData = await Order.find({ userId }).populate(
      "products.productId"
    );
    if (ordersUserData?.length == 0) {
      return res.json({
        success: false,
        message: "No orders found.",
      });
    }
    return res.json({
      success: true,
      orders: ordersUserData,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};

export const updateWishList = async (req, res) => {
  try {
    const { userId, productId, action } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required, Please Login.",
      });
    }

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required." });
    }

    let wishList = await WishList.findOne({ userId });

    if (!wishList) {
      wishList = new WishList({ userId, products: [] });
    }

    if (action === "add") {
      if (!wishList.products.includes(productId)) {
        wishList.products.push(productId);
      }
    } else if (action === "remove") {
      wishList.products = wishList.products.filter(
        (id) => id.toString() !== productId
      );
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid action." });
    }

    await wishList.save();

    const populatedWishList = await WishList.findById(wishList._id).populate(
      "products"
    );

    return res.json({
      success: true,
      message: `Product ${
        action === "add" ? "added to" : "removed from"
      } wishlist.`,
      wishlist: populatedWishList,
    });
  } catch (error) {
    console.log("Error updating wishlist:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getWishList = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    const wishlist = await WishList.findOne({ userId }).populate("products");

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found for this user.",
      });
    }

    return res.json({
      success: true,
      message: "Wishlist fetched successfully.",
      wishlist,
    });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
