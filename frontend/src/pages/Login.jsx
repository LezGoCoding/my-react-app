import { useState } from "react";
import "../styles/login.css";

export default function Login({ setSessionUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }) // Ensure correct JSON format
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || "Login failed");
        return;
      }

      const data = await response.json();
      console.log("🟢 Backend response:", data);

      if (data.message === "Login successful") {
        localStorage.setItem("sessionUser", data.user.fullname);
        localStorage.setItem("token", data.token); // Store the token
        setSessionUser(data.user.fullname);
        window.location.href = "/dashboard"; // Redirect to dashboard
      }


    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again 10 years.");
    }
  };

  return (
    <div className="login-container">

      <div className="circle circle1"></div>
      <div className="circle circle2"></div>

      <div className="login-card">

        <h1 className="login_clr">Login</h1>
        <p>Please sign in to continue</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* FIX: Button must be type="submit" */}
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <p className="forgot">
          Forgot your password? <span>Reset</span>
        </p>

      </div>
    </div>
  );
}
