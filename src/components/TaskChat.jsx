import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

function TaskChat({ taskId, user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  // 🔥 Create socket connection
  useEffect(() => {
    const newSocket = io("https://nexus-backend-dioy.onrender.com");
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  // 🔥 Load messages + join room
  useEffect(() => {
    if (!taskId || !socket) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `https://nexus-backend-dioy.onrender.com/api/messages/${taskId}`
        );
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    socket.emit("joinTask", taskId);

    socket.on("receiveMessage", (msg) => {
      if (msg.taskId === taskId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [taskId, socket]);

  // 🔥 Send message
  const sendMessage = () => {
    if (!message.trim() || !socket) return;

    const msgData = {
      taskId,
      sender: user.name,
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("sendMessage", {
      taskId,
      message: msgData,
    });

    setMessage("");
  };

  return (
    <div className="mt-4 p-4 rounded-xl bg-gray-100 dark:bg-gray-800">
      <h3 className="text-sm font-semibold mb-2">💬 Task Chat</h3>

      {/* Messages */}
      <div className="h-40 overflow-y-auto mb-3 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className="text-xs">
            <span className="font-semibold">{msg.sender}: </span>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 rounded bg-white dark:bg-gray-900 text-sm"
          placeholder="Type message..."
        />

        <button
          onClick={sendMessage}
          className="px-3 py-2 bg-purple-600 text-white rounded text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default TaskChat;