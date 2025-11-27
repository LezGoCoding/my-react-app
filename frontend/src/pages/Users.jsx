
function Users(){
    return <h1>This is Users Content</h1>;
    
}

const handleLogout = () => {
  localStorage.removeItem("sessionUser");
  setSessionUser(null); // reset session in App.jsx
};


export default Users;