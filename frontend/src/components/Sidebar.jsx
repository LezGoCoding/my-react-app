import { useState } from "react";

function Sidebar({ onMenuClick }) {
  const [active, setActive] = useState("dashboard");

  const handleClick = (menu) => {
    setActive(menu);
    onMenuClick(menu);
  };

  const btnStyle = (menu) => ({
    width: "100%",
    textAlign: "left",
    padding: "12px 16px",
    marginBottom: "10px",
    background: active === menu ? "#4A90E2" : "transparent",
    color: active === menu ? "white" : "#333",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
    transition: "0.3s",
  });

  return (
    <aside
      style={{
        width: "220px",
        background: "#f7f7f7",
        padding: "20px",
        height: "100vh",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ marginBottom: "20px", color: "#555" }}>Menu</h3>

      <button style={btnStyle("dashboard")} onClick={() => handleClick("dashboard")}>
        📊 Dashboard
      </button>

      <button style={btnStyle("users")} onClick={() => handleClick("users")}>
        👥 Users
      </button>

      <button style={btnStyle("employee")} onClick={() => handleClick("employee")}>
        👥 Employee
      </button>

      <button style={btnStyle("history")} onClick={() => handleClick("history")}>
        🕒 History
      </button>

      <button style={btnStyle("messenger")} onClick={() => handleClick("messenger")}>
        💬 Chats
      </button>

    </aside>
  );
}

export default Sidebar;
