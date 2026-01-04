import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

function DashboardOverview() {
  useTitle("Dashboard");
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalListings: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Fetch listings
      const listingsRes = await fetch("http://localhost:5000/listings");
      const listingsData = await listingsRes.json();
      const myListings =
        listingsData.data?.filter((listing) => listing.email === user.email) ||
        [];

      // Fetch orders
      const ordersRes = await fetch(
        `http://localhost:5000/orders/user/${user.email}`
      );
      const ordersData = await ordersRes.json();
      const myOrders = ordersData.data || [];

      // Calculate stats
      setStats({
        totalListings: myListings.length,
        totalOrders: myOrders.length,
        pendingOrders: myOrders.filter((o) => o.status === "pending").length,
        completedOrders: myOrders.filter((o) => o.status === "completed")
          .length,
      });
    } catch (err) {
      console.log("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <h1>Dashboard Overview</h1>
      <p>Welcome back, {user?.displayName || user?.email}!</p>

      {/* Stats Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            minWidth: "150px",
          }}
        >
          <h3>{stats.totalListings}</h3>
          <p>My Listings</p>
          <Link to="/dashboard/my-listings">View All</Link>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            minWidth: "150px",
          }}
        >
          <h3>{stats.totalOrders}</h3>
          <p>My Orders</p>
          <Link to="/dashboard/my-orders">View All</Link>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            minWidth: "150px",
          }}
        >
          <h3 style={{ color: "orange" }}>{stats.pendingOrders}</h3>
          <p>Pending</p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            minWidth: "150px",
          }}
        >
          <h3 style={{ color: "green" }}>{stats.completedOrders}</h3>
          <p>Completed</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: "30px" }}>
        <h2>Quick Actions</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/dashboard/add-listing">
            <button style={{ padding: "10px 20px" }}>+ Add New Listing</button>
          </Link>
          <Link to="/pets-and-supplies">
            <button style={{ padding: "10px 20px" }}>Browse Products</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
