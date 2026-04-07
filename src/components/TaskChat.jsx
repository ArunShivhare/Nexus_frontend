import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

function TaskChat({ taskId, user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [typingUser, setTypingUser] = useState("");
  const typingTimeoutRef = useRef(null);

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

    socket.on("userTyping", (userName) => {
      if (userName !== user.name) {
        setTypingUser(userName);
      }
    });

    socket.on("userStopTyping", () => {
      setTypingUser("");
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userTyping");
      socket.off("userStopTyping");
    };
  }, [taskId, socket, user.name]);

  // 🔥 Typing handler (debounced)
  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (!socket) return;

    socket.emit("typing", { taskId, user: user.name });

    // clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", { taskId });
    }, 1000);
  };

  // 🔥 Send message
  const sendMessage = () => {
    if (!message.trim() || !socket) return;

    const msgData = {
      taskId,
      sender: user.name,
      text: message,
      time: new Date().toLocaleTimeString(),
      seen: false,
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
      <div className="h-44 overflow-y-auto mb-3 space-y-2 flex flex-col">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[75%] px-3 py-2 rounded-lg text-xs ${
              msg.sender === user.name
                ? "bg-purple-600 text-white self-end"
                : "bg-gray-300 dark:bg-gray-700 text-black dark:text-white self-start"
            }`}
          >
            <p>{msg.text}</p>

            <div className="flex justify-between items-center mt-1 text-[10px] opacity-70">
              <span>{msg.time}</span>
              <span>{msg.seen ? "✔✔" : "✔"}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Typing indicator */}
      {typingUser && (
        <p className="text-xs text-gray-400 italic mb-2">
          {typingUser} is typing...
        </p>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={message}
          onChange={handleTyping}
          className="flex-1 p-2 rounded bg-white dark:bg-gray-900 text-sm outline-none"
          placeholder="Type message..."
        />

        <button
          onClick={sendMessage}
          className="px-3 py-2 bg-purple-600 text-white rounded text-sm hover:opacity-90"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default TaskChat;