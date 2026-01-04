import { Outlet, Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function DashboardLayout() {
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
      {/* Top Header */}
      <header style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
        <Link to="/">🐾 PawMart</Link>
        <span style={{ marginLeft: "20px" }}>
          Welcome, {user?.displayName || user?.email}
        </span>
        <button onClick={handleLogout} style={{ marginLeft: "20px" }}>
          Logout
        </button>
      </header>

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <aside
          style={{
            width: "200px",
            borderRight: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <nav>
            <h3>User Menu</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <NavLink to="/dashboard">Dashboard Overview</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-listing">Add Listing</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-listings">My Listings</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-orders">My Orders</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">Profile</NavLink>
              </li>
            </ul>

            <hr />

            <Link to="/">← Back to Home</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
