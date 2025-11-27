function Dashboard() {
  const cardStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    flex: 1,
  };
  
  return (
    
    <div style={{ padding: "20px" }}>
      {/* Page Title */}
      <h1 style={{ marginBottom: "20px", color: "#333" }}>Dashboard</h1>

      {/* TOP CARDS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Employees</h3>
          <p style={{ fontSize: "30px", fontWeight: "bold", marginTop: "10px" }}>
            120
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Attendance Today</h3>
          <p style={{ fontSize: "30px", fontWeight: "bold", marginTop: "10px" }}>
            98
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Pending Requests</h3>
          <p style={{ fontSize: "30px", fontWeight: "bold", marginTop: "10px", color: "#E67E22" }}>
            5
          </p>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>Recent Activity</h3>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Employee</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Action</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Date</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                John Doe
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                Logged In
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                Feb 20, 2025
              </td>
            </tr>

            <tr>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                Sarah Smith
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                Filed Request
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                Feb 20, 2025
              </td>
            </tr>

            <tr>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                Mark Wilson
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                Logged Out
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                Feb 20, 2025
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default Dashboard;
