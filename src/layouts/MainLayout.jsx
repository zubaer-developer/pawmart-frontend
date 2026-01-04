import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <nav>
        <a href="/">Home</a> |<a href="/login">Login</a> |
        <a href="/register">Register</a>
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
