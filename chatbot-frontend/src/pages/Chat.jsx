import { useEffect, useState } from "react";
import { chat } from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const projectId = params.get("projectId");

  // Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !projectId) {
      navigate("/projects");
    }
  }, [navigate, projectId]);

  async function sendMessage(e) {
    e.preventDefault();
    setError("");

    if (!input.trim()) return;

    const userMsg = { sender: "USER", message: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const aiReply = await chat({ projectId, message: input });
      const aiMsg = { sender: "AI", message: aiReply };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setError("Error calling AI service");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          height: "85vh",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: "16px",
            borderBottom: "1px solid #e5e7eb",
            fontWeight: "600",
          }}
        >
          💬 Chat
        </div>

        {/* MESSAGES */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            background: "#f9fafb",
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent:
                  m.sender === "USER" ? "flex-end" : "flex-start",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  maxWidth: "75%",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  background:
                    m.sender === "USER" ? "#4f46e5" : "#e5e7eb",
                  color: m.sender === "USER" ? "white" : "#111827",
                  fontSize: "14px",
                  lineHeight: "1.4",
                }}
              >
                {m.message}
              </div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <form
          onSubmit={sendMessage}
          style={{
            display: "flex",
            padding: "12px",
            borderTop: "1px solid #e5e7eb",
            gap: "10px",
          }}
        >
          <input
            placeholder="Type your message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#4f46e5",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </form>

        {error && (
          <p style={{ color: "red", padding: "0 12px 10px" }}>{error}</p>
        )}
      </div>
    </div>
  );
}

export default Chat;
