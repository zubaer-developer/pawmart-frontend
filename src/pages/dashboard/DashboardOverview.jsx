import useAuth from "../../hooks/useAuth";

function DashboardOverview() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard Overview</h1>
      <p>Welcome back, {user?.displayName || user?.email}!</p>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            minWidth: "150px",
          }}
        >
          <h3>0</h3>
          <p>My Listings</p>
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            minWidth: "150px",
          }}
        >
          <h3>0</h3>
          <p>My Orders</p>
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            minWidth: "150px",
          }}
        >
          <h3>0</h3>
          <p>Pending</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
