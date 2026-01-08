import { useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import Loading from "../components/Loading";
import ThemeToggle from "../components/shared/ThemeToggle";

function DashboardLayout() {
  const { user, logOut, loading } = useAuth();
  const { isAdmin, adminLoading } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  if (loading || adminLoading) return <Loading />;

  // Custom Active Link Style (Panze Layout + PawMart Colors)
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 font-medium text-sm mb-1 ${
      isActive
        ? "bg-primary text-white shadow-lg shadow-orange-500/20" // Active: Orange & Shadow
        : "text-base-content/60 hover:bg-base-200 hover:text-primary" // Inactive
    }`;

  return (
    <div className="min-h-screen bg-base-200 font-sans transition-colors duration-300">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-base-100 z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 border-r border-base-300 p-6 overflow-y-auto`}
      >
        {/* Logo (Same as Frontend) */}
        <div className="mb-10 px-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-xl shadow-lg text-white">
            🐾
          </div>
          <div>
            <Link className="text-2xl font-bold" to="/">
              <span className="text-primary">Paw</span>
              <span className="text-base-content">Mart</span>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col h-[calc(100%-80px)] justify-between">
          <nav className="space-y-6">
            {/* User Menu */}
            <div>
              <p className="px-5 text-xs font-bold text-base-content/40 uppercase tracking-wider mb-4">
                Menu
              </p>
              <div className="space-y-1">
                <NavLink to="/dashboard" end className={linkClass}>
                  <span className="text-lg">📊</span> Overview
                </NavLink>
                <NavLink to="/dashboard/add-listing" className={linkClass}>
                  <span className="text-lg">➕</span> Add Listing
                </NavLink>
                <NavLink to="/dashboard/my-listings" className={linkClass}>
                  <span className="text-lg">📋</span> My Listings
                </NavLink>
                <NavLink to="/dashboard/my-orders" className={linkClass}>
                  <span className="text-lg">🛒</span> My Orders
                </NavLink>
                <NavLink to="/dashboard/profile" className={linkClass}>
                  <span className="text-lg">👤</span> Profile
                </NavLink>
              </div>
            </div>

            {/* Admin Menu */}
            {isAdmin && (
              <div>
                <p className="px-5 text-xs font-bold text-base-content/40 uppercase tracking-wider mb-4">
                  Admin Tools
                </p>
                <div className="space-y-1">
                  <NavLink to="/dashboard/manage-users" className={linkClass}>
                    <span className="text-lg">👥</span> Manage Users
                  </NavLink>
                  <NavLink
                    to="/dashboard/manage-listings"
                    className={linkClass}
                  >
                    <span className="text-lg">📦</span> Manage Listings
                  </NavLink>
                  <NavLink to="/dashboard/manage-orders" className={linkClass}>
                    <span className="text-lg">📝</span> Manage Orders
                  </NavLink>
                </div>
              </div>
            )}
          </nav>

          {/* Bottom Actions */}
          <div className="space-y-2">
            <Link
              to="/"
              className="flex items-center gap-3 px-5 py-3 rounded-2xl text-base-content/60 hover:bg-base-200 transition-colors"
            >
              <span className="text-lg">🏠</span> Back Home
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-5 py-3 w-full rounded-2xl text-error hover:bg-error/10 transition-colors text-left"
            >
              <span className="text-lg">🚪</span> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-[280px]">
        {/* Top Header (Mobile Only) */}
        <header className="lg:hidden bg-base-100/80 backdrop-blur-md p-4 flex justify-between items-center sticky top-0 z-30 border-b border-base-300">
          <span className="font-bold text-lg text-primary">PawMart</span>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 bg-base-200 rounded-lg text-base-content"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>

        <ThemeToggle />
      </div>
    </div>
  );
}

export default DashboardLayout;
