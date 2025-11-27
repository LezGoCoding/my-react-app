
function History(){
    return <h1>This is History Content</h1>;
    
}

const handleLogout = () => {
  localStorage.removeItem("sessionUser");
  setSessionUser(null); // reset session in App.jsx
};


export default History;