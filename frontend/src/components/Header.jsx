import { useNavigate } from "react-router-dom";

function Header({ setSessionUser }) {
  const userName = localStorage.getItem("sessionUser") || "Guest";

  const handleLogout = () => {
    window.location.reload();
    localStorage.removeItem("sessionUser");
    setSessionUser(null); // Go back to Login
    
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 25px",
        background: "#4A90E2",
        color: "white",
      }}
    >
      <h2 style={{ margin: 0 }}>My React App</h2>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <span style={{ fontSize: "16px", fontWeight: "500" }}>
          {userName}
        </span>

        <button
          style={{
            background: "white",
            color: "#4A90E2",
            border: "none",
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
