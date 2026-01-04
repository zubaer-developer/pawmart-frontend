import { useState, useEffect } from "react";

function Statistics() {
  const [stats, setStats] = useState({
    totalPets: 0,
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch listings
      const listingsRes = await fetch("http://localhost:5000/listings");
      const listingsData = await listingsRes.json();

      const pets =
        listingsData.data?.filter((l) => l.category === "Pets").length || 0;
      const products =
        listingsData.data?.filter((l) => l.category !== "Pets").length || 0;

      // Fetch users
      const usersRes = await fetch("http://localhost:5000/users");
      const usersData = await usersRes.json();

      // Fetch orders
      const ordersRes = await fetch("http://localhost:5000/orders");
      const ordersData = await ordersRes.json();

      setStats({
        totalPets: pets,
        totalProducts: products,
        totalUsers: usersData.data?.length || 0,
        totalOrders: ordersData.data?.length || 0,
      });
    } catch (err) {
      console.log("Error fetching stats:", err);
    }
  };

  const statsData = [
    { label: "Pets Available", value: stats.totalPets, icon: "🐾" },
    { label: "Products Listed", value: stats.totalProducts, icon: "📦" },
    { label: "Happy Users", value: stats.totalUsers, icon: "👥" },
    { label: "Successful Orders", value: stats.totalOrders, icon: "✅" },
  ];

  return (
    <section
      style={{ padding: "40px", backgroundColor: "#333", color: "white" }}
    >
      <h2 style={{ textAlign: "center" }}>PawMart in Numbers</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        {statsData.map((stat) => (
          <div
            key={stat.label}
            style={{ textAlign: "center", minWidth: "150px" }}
          >
            <span style={{ fontSize: "40px" }}>{stat.icon}</span>
            <h3 style={{ fontSize: "36px", margin: "10px 0" }}>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Statistics;
