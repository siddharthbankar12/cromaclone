import { useEffect } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// const socket = io("http://localhost:8000", {
//   withCredentials: true,
//   transports: ["websocket"],
// });

const socket = io("https://cromaclone.onrender.com", {
  withCredentials: true,
  transports: ["websocket"],
});

const useServerSocket = () => {
  const userData = useSelector((state) => state.user.user);

  useEffect(() => {
    if (userData?.userId && userData?.role === "seller") {
      socket.emit("registerSeller", { sellerId: userData.userId });
    }

    socket.on("proceedToPayment", ({ buyerName, productData }) => {
      toast.success(
        `Your product ${productData?.name} was bought by ${buyerName}.`
      );
    });

    socket.on("buyNow", ({ buyerName, productData }) => {
      toast.success(
        `Your product ${productData?.name} was bought by ${buyerName}.`
      );
    });

    return () => {
      socket.off("proceedToPayment");
      socket.off("buyNow");
    };
  }, [userData]);

  return socket;
};

export default useServerSocket;
