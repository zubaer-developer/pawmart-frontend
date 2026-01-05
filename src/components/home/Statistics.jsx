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
      label: "Successful Orders",
      value: stats.totalOrders,
      icon: "✅",
      color: "from-purple-400 to-pink-500",
      suffix: "",
    },
  ];

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-4">
            📊 Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            PawMart in Numbers
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of pet lovers who trust PawMart for their adoption
            and shopping needs
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statsData.map((stat, index) => (
            <div
              key={stat.label}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                {/* Icon */}
                <div
                  className={`w-16 h-16 mx-auto mb-4 bg-linear-to-br ${stat.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}
                >
                  {stat.icon}
                </div>

                {/* Number */}
                <h3 className="text-4xl lg:text-5xl font-black text-white mb-2">
                  {stat.value}
                  {stat.suffix}
                </h3>

                {/* Label */}
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Statistics;
