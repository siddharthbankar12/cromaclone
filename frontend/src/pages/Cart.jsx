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
  const router = useNavigate();
  const dispatch = useDispatch();

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
        getCartProducts();
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
        getCartProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkOut = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/user/checkout", {
        userId: userData.userId,
        products,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setCartCount(0));
        router("/order-history");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.userId) {
      getCartProducts();
    }
  }, [userData]);

  return (
    <>
      <h1 className="cartHead">Your Cart</h1>
      {loading ? (
        <h1 className="cart-loading">Loading...</h1>
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
                      <b>Price :</b> ₹{product.price}
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
                <b>Total Price:</b> ₹{totalPrice}
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
