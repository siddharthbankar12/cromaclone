import { Server } from "socket.io";
import User from "../models/user.schema.js";

export const sellerSockets = new Map();

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      // origin: "http://localhost:3000",
      origin: "https://cromaclone.vercel.app",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket server connected to ${socket.id}`);

    socket.on("registerSeller", async (sellerData) => {
      const isSellerExist = await User.findById(sellerData.sellerId);
      if (isSellerExist) {
        sellerSockets.set(sellerData.sellerId, socket.id);
        console.log(sellerData.sellerId, socket.id, "set");
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnect");
      for (let [sellerId, socketId] of sellerSockets.entries()) {
        if (socketId === socket.id) {
          sellerSockets.delete(sellerId);
          console.log("connection closed for", sellerId);
          break;
        }
      }
    });
  });

  return io;
};
