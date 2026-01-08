import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import useTitle from "../../hooks/useTitle";

function DashboardOverview() {
  useTitle("Dashboard");
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  const [stats, setStats] = useState({
    totalListings: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });

  // Dummy Data for Charts
  const data = [
    { name: "Jan", uv: 40, pv: 24 },
    { name: "Feb", uv: 30, pv: 13 },
    { name: "Mar", uv: 98, pv: 20 },
    { name: "Apr", uv: 39, pv: 27 },
    { name: "May", uv: 48, pv: 18 },
    { name: "Jun", uv: 23, pv: 38 },
    { name: "Jul", uv: 34, pv: 43 },
  ];

  useEffect(() => {
    setStats({ totalListings: 12, totalOrders: 5, pendingOrders: 2 });
  }, []);

  const PRIMARY_COLOR = "#f97316";
  const SECONDARY_COLOR = "#22c55e";
  const MUTED_COLOR = "#e5e7eb";
  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Overview</h1>
          <p className="text-base-content/60 mt-1">
            Hi {user?.displayName?.split(" ")[0]}, here's what's happening.
          </p>
        </div>
        <div className="hidden sm:flex gap-4">
          <span className="px-4 py-2 bg-base-100 rounded-full text-sm font-medium shadow-sm text-base-content/70 border border-base-300">
            📅 Last 30 Days
          </span>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-sm border border-base-200 hover:shadow-lg transition-all">
          <div className="flex items-start justify-between mb-6">
            <div className="p-4 bg-orange-100 text-orange-600 rounded-2xl text-2xl">
              {isAdmin ? "👥" : "📋"}
            </div>
            <span className="text-xs font-bold text-base-content/40 tracking-wider">
              {isAdmin ? "USERS" : "LISTINGS"}
            </span>
          </div>
          <h3 className="text-4xl font-black text-base-content mb-2">
            {isAdmin ? "430" : stats.totalListings}
          </h3>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-base-content/60">
              {isAdmin ? "Total Registered" : "Active Listings"}
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-lg text-xs font-bold">
              +12%
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-sm border border-base-200 hover:shadow-lg transition-all">
          <div className="flex items-start justify-between mb-6">
            <div className="p-4 bg-green-100 text-green-600 rounded-2xl text-2xl">
              🛒
            </div>
            <span className="text-xs font-bold text-base-content/40 tracking-wider">
              ORDERS
            </span>
          </div>
          <h3 className="text-4xl font-black text-base-content mb-2">
            {isAdmin ? "1,204" : stats.totalOrders}
          </h3>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-base-content/60">Total Orders</span>
            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-lg text-xs font-bold">
              +5%
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-sm border border-base-200 hover:shadow-lg transition-all">
          <div className="flex items-start justify-between mb-6">
            <div className="p-4 bg-purple-100 text-purple-600 rounded-2xl text-2xl">
              ⏳
            </div>
            <span className="text-xs font-bold text-base-content/40 tracking-wider">
              PENDING
            </span>
          </div>
          <h3 className="text-4xl font-black text-base-content mb-2">
            {stats.pendingOrders}
          </h3>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-base-content/60">Needs Action</span>
            {stats.pendingOrders > 0 ? (
              <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-lg text-xs font-bold">
                Action Req.
              </span>
            ) : (
              <span className="px-2 py-1 bg-base-200 text-base-content/50 rounded-lg text-xs font-bold">
                All Good
              </span>
            )}
          </div>
        </div>
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Bar Chart (Orange Theme) */}
        <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-sm border border-base-200">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-base-content">
              {isAdmin ? "New Users" : "Profile Views"}
            </h3>
            <select className="bg-base-200 border-none rounded-lg text-xs px-3 py-2 outline-none text-base-content/70 cursor-pointer">
              <option>Last 6 months</option>
            </select>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  dy={10}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    backgroundColor: "var(--fallback-b1,oklch(var(--b1)/1))",
                    color: "var(--fallback-bc,oklch(var(--bc)/1))",
                  }}
                />
                <Bar dataKey="uv" radius={[10, 10, 10, 10]} barSize={40}>
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 2 ? PRIMARY_COLOR : "#E5E7EB"} // Highlight March in Orange
                      className={index !== 2 ? "dark:fill-gray-700" : ""} // Dark mode fix for inactive bars
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Area Chart (Green Theme) */}
        <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-sm border border-base-200">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-base-content">
              Activity Trends
            </h3>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={SECONDARY_COLOR}
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor={SECONDARY_COLOR}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  dy={10}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    backgroundColor: "var(--fallback-b1,oklch(var(--b1)/1))",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stroke={SECONDARY_COLOR}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
