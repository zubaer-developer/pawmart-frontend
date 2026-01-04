import { Outlet, Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

function DashboardLayout() {
  const { user, logOut, loading } = useAuth();
  const { isAdmin, adminLoading } = useAdmin();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  if (loading || adminLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Header */}
      <header style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
        <Link to="/">🐾 PawMart</Link>
        <span style={{ marginLeft: "20px" }}>
          Welcome, {user?.displayName || user?.email}
          {isAdmin && (
            <span style={{ color: "green", marginLeft: "10px" }}>(Admin)</span>
          )}
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
            minHeight: "80vh",
          }}
        >
          <nav>
            <h3>User Menu</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                <NavLink to="/dashboard">Dashboard Overview</NavLink>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <NavLink to="/dashboard/add-listing">Add Listing</NavLink>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <NavLink to="/dashboard/my-listings">My Listings</NavLink>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <NavLink to="/dashboard/my-orders">My Orders</NavLink>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <NavLink to="/dashboard/profile">Profile</NavLink>
              </li>
            </ul>

            {/* Admin Menu - Only visible to admins */}
            {isAdmin && (
              <>
                <hr />
                <h3>Admin Menu</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li style={{ marginBottom: "8px" }}>
                    <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    <NavLink to="/dashboard/manage-listings">
                      Manage Listings
                    </NavLink>
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    <NavLink to="/dashboard/manage-orders">
                      Manage Orders
                    </NavLink>
                  </li>
                </ul>
              </>
            )}

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
