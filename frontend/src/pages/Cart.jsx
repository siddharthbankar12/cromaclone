import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import "../style/Cart.css";
import { setCartCount } from "../store/userSlice";

const Cart = () => {
  const userData = useSelector((state) => state.user.user);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const route = useNavigate();
  const dispatch = useDispatch();

  console.log(userData);

  const getCartProducts = async () => {
    try {
      if (!userData?.userId) {
        return toast.error("Please login to view cart products");
      }
      setLoading(true);
      const response = await axiosInstance.post("/user/get-cart-products", {
        userId: userData.userId,
      });
      if (response.data.success) {
        setProducts(response.data.products);
        let totalQuantity = 0;
        response.data.products.forEach((item) => {
          totalQuantity += item.quantity;
        });
        setQuantity(totalQuantity);
        setTotalPrice(response.data.totalPrice);
        dispatch(setCartCount(totalQuantity));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeCartProduct = async (productId) => {
    try {
      const response = await axiosInstance.post("/user/delete-cart-products", {
        userId: userData.userId,
        productId,
      });
      if (response.data.success) {
        toast.success("Product removed from cart");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        recalculateTotal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (productId, action) => {
    try {
      const response = await axiosInstance.post(
        "/user/update-cart-product-quantity",
        { userId: userData.userId, productId, action }
      );
      if (response.data.success) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId
              ? {
                  ...product,
                  quantity:
                    action === "increase"
                      ? product.quantity + 1
                      : Math.max(product.quantity - 1, 1),
                }
              : product
          )
        );

        recalculateTotal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkOut = async () => {
    if (!userData?.userId) {
      toast.error("User not logged in.");
      return;
    }

    try {
      if (products.length < 1) {
        return toast.warn("Please add some products to the cart");
      }

      setLoading(true);
      const response = await axiosInstance.post("/user/checkout", {
        userId: userData.userId,
        userAddress: userData.address,
        products,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setCartCount(0));
        route("/order-history");
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const recalculateTotal = () => {
    let total = 0;
    let qty = 0;
    products.forEach((item) => {
      total += item.price * item.quantity;
      qty += item.quantity;
    });
    setTotalPrice(total);
    setQuantity(qty);
    dispatch(setCartCount(qty));
  };

  useEffect(() => {
    recalculateTotal();
  }, [products]);

  useEffect(() => {
    if (userData?.userId) {
      getCartProducts();
    }
  }, [userData]);

  return (
    <>
      <h1 className="cartHead">Your Cart</h1>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="cart-container">
          <div className="cart-products">
            {products.length > 0 ? (
              products.map((product, idx) => (
                <div key={idx} className="cart-product-card">
                  <div
                    className="cart-product-delete"
                    onClick={(event) => {
                      event.stopPropagation();
                      removeCartProduct(product._id);
                    }}
                  >
                    <MdDelete />
                  </div>
                  <div className="leftCP">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="cart-product-image"
                    />
                  </div>
                  <div className="rightCP">
                    <h2>
                      <b>Product Name :</b> {product.name}
                    </h2>
                    <p>
                      <b>Price :</b> ₹{product.price.toLocaleString("en-IN")}
                    </p>
                    <p>
                      <b>Category :</b> {product.category}
                    </p>
                    <div className="cart-quantity">
                      <b>Quantity :</b>
                      <div className="cart-quantity-controls">
                        <FaPlus
                          size={12}
                          className="quantity-icon"
                          onClick={() =>
                            updateQuantity(product._id, "increase")
                          }
                        />
                        {product.quantity}
                        <FaMinus
                          size={12}
                          className="quantity-icon"
                          onClick={() =>
                            updateQuantity(product._id, "decrease")
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: "white" }}>Zero Products in cart ...</p>
            )}
          </div>

          <div className="cart-details">
            <b className="cart-details-title">Cart Details</b>
            <div className="cart-details-content">
              <p>
                <b>Total Cart Products:</b> {quantity}
              </p>
              <p>
                <b>Total Price:</b> ₹{totalPrice.toLocaleString("en-IN")}
              </p>
              <div className="btnCenter">
                <button className="cart-checkout-btn" onClick={checkOut}>
                  Proceed To Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
