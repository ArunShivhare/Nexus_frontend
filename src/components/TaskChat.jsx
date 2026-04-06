import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://nexus-backend-dioy.onrender.com"); // 🔥 your backend URL

function TaskChat({ taskId, user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // join room
  useEffect(() => {
    if (!taskId) return;

    socket.emit("joinTask", taskId);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [taskId]);

  // send message
  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      sender: user.name,
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("sendMessage", {
      taskId,
      message: msgData,
    });

    setMessages((prev) => [...prev, msgData]);
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