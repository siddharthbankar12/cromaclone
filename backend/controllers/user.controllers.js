import User from "../models/user.schema.js";
import Product from "../models/product.schema.js";
import Cart from "../models/cart.schema.js";
import Order from "../models/order.schema.js";

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
    const { userId, products } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User is required" });
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
      allProducts.push({
        productId: products[i]._id,
        quantity: products[i].quantity,
      });
      totalPrice += products[i].price * products[i].quantity;
    }

    const newOrder = Order({
      userId,
      products: allProducts,
      price: totalPrice,
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
