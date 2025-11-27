import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee";
import History from "./pages/History";
import Login from "./pages/Login";
import Messenger from "./pages/Messenger";
import Users from "./pages/Users";

function App() {
  const [page, setPage] = useState("dashboard");

  // Login session state
  const [sessionUser, setSessionUser] = useState(null);

  // Load saved session on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("sessionUser");
    if (savedUser) {
      setSessionUser(savedUser);
    }
  }, []);

  // If NOT logged in → show login page
  if (!sessionUser) {
    return <Login setSessionUser={setSessionUser} />;
  }
  
  // Logged in → show full app
  return (
    <Layout
      onMenuClick={setPage}
      sessionUser={sessionUser}
      setSessionUser={setSessionUser}
    >
      {page === "employee" ? (
        <Employee />
      ): page === "users" ? (
        <Users />
      ) : page === "messenger" ? (
        <Messenger />
      ) : page === "history" ? (
        <History />
      ) : (
        <Dashboard />
      )}
    </Layout>
  );
}

export default App;
