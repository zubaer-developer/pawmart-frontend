import { Outlet, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function MainLayout() {
  const { user, logOut, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |
        <Link to="/pets-and-supplies">Pets & Supplies</Link> |
        <Link to="/about">About</Link> |<Link to="/contact">Contact</Link> |
        {user ? (
          <>
            <span>Hello, {user.displayName || user.email}</span> |
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> |<Link to="/register">Register</Link>
          </>
        )}
      </nav>

      <hr />

      <Outlet />

      <hr />

      <footer>
        <p>© 2025 PawMart. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default MainLayout;
