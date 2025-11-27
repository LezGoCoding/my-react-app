import { useState, useEffect } from "react";

// Replace these with actual API URLs
const API_URL = "http://127.0.0.1:8000"; // Replace with the actual FastAPI server URL

// API Functions
const fetchUsers = async (token) => {
  const response = await fetch(`${API_URL}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 401) {
    throw new Error("Invalid token");
  }
  return response.json();
};

const fetchConversation = async (userId, token) => {
  const response = await fetch(`${API_URL}/api/conversation/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 401) {
    throw new Error("Invalid token");
  }
  return response.json();
};

const sendMessage = async (conversationId, message, token) => {
  const response = await fetch(`${API_URL}/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      conversation_id: conversationId,
      content: message,
    }),
  });
  
  if (response.status === 401) {
    throw new Error("Invalid token");
  }

  if (!response.ok) {
    // Handle unexpected errors
    const errorData = await response.json();
    console.error("Message send failed:", errorData);
    throw new Error(`Error sending message: ${errorData.message}`);
  }

  return response.json();
};

function Messenger() {
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        if (!token) {
          throw new Error("No token found, please log in.");
        }
        const usersData = await fetchUsers(token);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
        if (error.message.includes("Unauthorized")) {
          alert("Session expired or invalid token. Please log in again.");
          localStorage.removeItem("token");
          setToken(null);
          window.location.href = "/login";
        } else {
          alert("An error occurred. Please try again later.");
        }
      }
    };

    if (token) {
      fetchUsersData();
    }
  }, [token]);

  useEffect(() => {
    if (activeUser) {
      const fetchMessagesData = async () => {
        try {
          const messagesData = await fetchConversation(activeUser.id, token);
          console.log("Fetched messages data:", messagesData);

          if (Array.isArray(messagesData)) {
            setMessages(messagesData);
          } else {
            setMessages([]); // Empty array if no conversation found
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessagesData();
    }
  }, [activeUser, token]);

  const handleSelectUser = (user) => {
    console.log("Selected user:", user);
    if (user) {
      setActiveUser(user);
      setMessages([]); // Reset messages when a new user is selected
    } else {
      alert("Error selecting user. Please try again.");
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      try {
        const conversationId = 1; // Replace with actual conversation ID (could be dynamic)
        const response = await sendMessage(conversationId, newMessage, token);
        setMessages([...messages, { sender: "You", text: newMessage }]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
        if (error.message === "Invalid token") {
          alert("Session expired. Please log in again.");
        }
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3 style={styles.sidebarTitle}>Users</h3>
        <ul style={styles.userList}>
          {users.map((user) => (
            <li
              key={user.id}
              style={styles.userItem}
              onClick={() => handleSelectUser(user)}
            >
              <img
                src={`https://randomuser.me/api/portraits/men/${user.id}.jpg`}
                alt={user.fullname}
                style={styles.userAvatar}
              />
              {user.fullname}
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.chatArea}>
        {activeUser ? (
          <>
            <h2 style={styles.chatHeader}>
             {activeUser?.fullname || "Unknown User"}
            </h2>
            <div style={styles.chatBox}>
              {messages.length === 0 ? (
                <div>No messages yet</div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    style={msg.sender === "You" ? styles.sentMessage : styles.receivedMessage}
                  >
                    <div style={styles.messageHeader}>
                      <img
                        src={msg.sender === "You" ? users[0].avatar : "https://randomuser.me/api/portraits/men/1.jpg"}
                        alt={msg.sender}
                        style={styles.messageAvatar}
                      />
                      <strong>{msg.sender}:</strong>
                    </div>
                    <div>{msg.text}</div>
                  </div>
                ))
              )}
            </div>
            <div style={styles.inputContainer}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                style={styles.input}
              />
              <button onClick={handleSendMessage} style={styles.sendButton}>
                Send
              </button>
            </div>
          </>
        ) : (
          <h2 style={styles.chatHeader}>Select a user to start chatting</h2>
        )}
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Arial', sans-serif",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
  },
  sidebarTitle: {
    fontSize: "18px",
    marginBottom: "20px",
    color: "#333",
  },
  userList: {
    listStyleType: "none",
    padding: 0,
  },
  userItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    background: "#fff",
    marginBottom: "10px",
    cursor: "pointer",
    borderRadius: "6px",
    transition: "background-color 0.3s",
  },
  userAvatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  chatArea: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  chatHeader: {
    fontSize: "20px",
    marginBottom: "15px",
    color: "#333",
  },
  chatBox: {
    // flex: 1,
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#f7f7f7",
    borderRadius: "6px",
    // overflowY: "auto",
    height: "400px",
  },
  
  sentMessage: {
    backgroundColor: "#d1f1d1",
    padding: "8px",
    borderRadius: "8px",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
  },
  receivedMessage: {
    backgroundColor: "#f1f1f1",
    padding: "8px",
    borderRadius: "8px",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
  },
  messageHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  },
  messageAvatar: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    marginRight: "8px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    marginRight: "10px",
    fontSize: "14px",
  },
  sendButton: {
    padding: "10px 15px",
    backgroundColor: "#4A90E2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Messenger;
