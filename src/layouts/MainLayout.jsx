import { Outlet, Link } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |
        <Link to="/pets-and-supplies">Pets & Supplies</Link> |
        <Link to="/about">About</Link> |<Link to="/contact">Contact</Link> |
        <Link to="/login">Login</Link> |<Link to="/register">Register</Link>
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
