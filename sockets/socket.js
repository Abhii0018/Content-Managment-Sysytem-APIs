import { sendChatService } from "../services/chat.service.js";

export const setupSocket = (io) => {
    const onlineUsers = new Map();

    io.on("connection", (socket) => {
        console.log("Socket connected", socket.id);

        socket.on("register", ({ userId }) => {
            if (!userId) {
                return;
            }

            onlineUsers.set(userId, socket.id);
            socket.data.userId = userId;
            socket.emit("registered", { userId });
        });

        socket.on("sendMessage", async ({ receiveId, message }) => {
            try {
                const senderId = socket.data.userId;

                if (!senderId || !receiveId || !message) {
                    socket.emit("messageError", {
                        message: "senderId, receiveId, and message are required"
                    });
                    return;
                }

                const newMessage = await sendChatService(senderId, receiveId, message);
                const receiverSocketId = onlineUsers.get(receiveId);

                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("receiveMessage", newMessage);
                }

                socket.emit("messageSent", newMessage);
            } catch (error) {
                socket.emit("messageError", {
                    message: error.message || "Failed to send message"
                });
            }
        });

        socket.on("disconnect", () => {
            console.log("client disconnected", socket.id);

            for(let [userId, sId] of onlineUsers.entries()){
                if(sId === socket.id){
                    onlineUsers.delete(userId);
                    break;
                }
            }       
        });
    });
};