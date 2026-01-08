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
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const listingsRes = await fetch("http://localhost:5000/listings");
      const listingsData = await listingsRes.json();
      const myListings =
        listingsData.data?.filter((listing) => listing.email === user.email) ||
        [];

      const ordersRes = await fetch(
        `http://localhost:5000/orders/user/${user.email}`
      );
      const ordersData = await ordersRes.json();
      const myOrders = ordersData.data || [];

      setStats({
        totalListings: myListings.length,
        totalOrders: myOrders.length,
        pendingOrders: myOrders.filter((o) => o.status === "pending").length,
        completedOrders: myOrders.filter((o) => o.status === "completed")
          .length,
      });

      setRecentOrders(myOrders.slice(0, 5));
    } catch (err) {
      console.log("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: "My Listings",
      value: stats.totalListings,
      icon: "📋",
      color: "from-orange-400 to-rose-500",
      link: "/dashboard/my-listings",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: "🛒",
      color: "from-blue-400 to-indigo-500",
      link: "/dashboard/my-orders",
    },
    {
      title: "Pending",
      value: stats.pendingOrders,
      icon: "⏳",
      color: "from-amber-400 to-orange-500",
      link: "/dashboard/my-orders",
    },
    {
      title: "Completed",
      value: stats.completedOrders,
      icon: "✅",
      color: "from-green-400 to-emerald-500",
      link: "/dashboard/my-orders",
    },
  ];

  return (
    <div>
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-orange-500 to-rose-500 rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 text-[150px] opacity-10 -mt-10 -mr-10">
          🐾
        </div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome back, {user?.displayName || "User"}!
          </h1>
          <p className="text-white/80">
            Here's what's happening with your PawMart account today.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-14 h-14 bg-linear-to-br ${card.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {card.icon}
              </div>
              <span className="text-gray-400 group-hover:text-orange-500 transition-colors">
                →
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {loading ? "..." : card.value}
            </h3>
            <p className="text-gray-500">{card.title}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions & Recent Orders */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span>⚡</span> Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/dashboard/add-listing"
              className="p-4 bg-linear-to-br from-orange-50 to-rose-50 rounded-xl hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-rose-500 rounded-xl flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                ➕
              </div>
              <h3 className="font-semibold text-gray-800">Add Listing</h3>
              <p className="text-sm text-gray-500">Create new pet or product</p>
            </Link>

            <Link
              to="/pets-and-supplies"
              className="p-4 bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                🔍
              </div>
              <h3 className="font-semibold text-gray-800">Browse</h3>
              <p className="text-sm text-gray-500">Find pets & supplies</p>
            </Link>

            <Link
              to="/dashboard/my-orders"
              className="p-4 bg-linear-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-linear-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                📦
              </div>
              <h3 className="font-semibold text-gray-800">My Orders</h3>
              <p className="text-sm text-gray-500">Track your orders</p>
            </Link>

            <Link
              to="/dashboard/profile"
              className="p-4 bg-linear-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                👤
              </div>
              <h3 className="font-semibold text-gray-800">Profile</h3>
              <p className="text-sm text-gray-500">Update your info</p>
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span>🕐</span> Recent Orders
            </h2>
            <Link
              to="/dashboard/my-orders"
              className="text-orange-500 text-sm font-medium hover:underline"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-5xl mb-4 block">📭</span>
              <p className="text-gray-500">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-orange-100 to-rose-100 rounded-xl flex items-center justify-center text-xl">
                    {order.category === "Pets" ? "🐾" : "📦"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 truncate">
                      {order.productName}
                    </h4>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {order.status || "pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
