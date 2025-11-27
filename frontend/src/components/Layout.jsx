import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Layout({ children, onMenuClick, sessionUser, setSessionUser }) {
  return (
    <div>
      <Header setSessionUser={setSessionUser} sessionUser={sessionUser} />

      <div style={{ display: "flex" }}>
        <Sidebar onMenuClick={onMenuClick} />

        <main style={{ padding: "20px", flexGrow: 1 }}>
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Layout;

