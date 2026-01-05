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
      const listingsRes = await fetch("http://localhost:5000/listings");
      const listingsData = await listingsRes.json();

      const pets =
        listingsData.data?.filter((l) => l.category === "Pets").length || 0;
      const products =
        listingsData.data?.filter((l) => l.category !== "Pets").length || 0;

      const usersRes = await fetch("http://localhost:5000/users");
      const usersData = await usersRes.json();

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
    {
      label: "Pets Available",
      value: stats.totalPets,
      icon: "🐾",
      color: "from-orange-400 to-rose-500",
      suffix: "+",
    },
    {
      label: "Products Listed",
      value: stats.totalProducts,
      icon: "📦",
      color: "from-blue-400 to-indigo-500",
      suffix: "+",
    },
    {
      label: "Happy Users",
      value: stats.totalUsers,
      icon: "👥",
      color: "from-green-400 to-emerald-500",
      suffix: "+",
    },
    {
      label: "Orders Done",
      value: stats.totalOrders,
      icon: "✅",
      color: "from-purple-400 to-pink-500",
      suffix: "",
    },
  ];

  return (
    <section className="py-12 bg-gray-950 border-y border-white/5">
      <div className="container mx-auto ">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {statsData.map((stat, index) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={`shrink-0 w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}
              >
                {stat.icon}
              </div>

              <div>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl md:text-3xl font-black text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-orange-500 font-bold text-lg">
                    {stat.suffix}
                  </span>
                </div>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-500">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Statistics;
