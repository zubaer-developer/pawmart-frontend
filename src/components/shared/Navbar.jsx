import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Navbar() {
  const { user, logOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
      isActive
        ? "text-orange-500 bg-orange-50"
        : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg py-2"
            : "bg-white py-4"
        }`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                🐾
              </div>
              <div>
                <span className="text-2xl font-bold">
                  <span className="text-orange-500">Paw</span>
                  <span className="text-gray-800">Mart</span>
                </span>
                <p className="text-xs text-gray-400 -mt-1 hidden sm:block">
                  Find Your Friend
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/pets-and-supplies" className={navLinkClass}>
                Pets & Supplies
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="hidden md:block text-right">
                      <p className="font-semibold text-gray-700 group-hover:text-orange-500 transition-colors">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-400">Welcome back!</p>
                    </div>
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-orange-100 group-hover:ring-orange-300 transition-all duration-300">
                        <img
                          src={
                            user.photoURL || "https://i.pravatar.cc/150?img=1"
                          }
                          alt={user.displayName || "User"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  </label>

                  {/* Dropdown Menu */}
                  <div
                    tabIndex={0}
                    className="dropdown-content mt-4 z-50 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                  >
                    {/* User Header */}
                    <div className="p-4 gradient-primary text-white">
                      <p className="font-bold text-lg">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-sm opacity-80 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-xl">📊</span>
                        <span className="font-medium">Dashboard</span>
                      </Link>
                      <Link
                        to="/dashboard/profile"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-xl">👤</span>
                        <span className="font-medium">My Profile</span>
                      </Link>
                      <Link
                        to="/dashboard/my-listings"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-xl">📋</span>
                        <span className="font-medium">My Listings</span>
                      </Link>
                      <Link
                        to="/dashboard/my-orders"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-xl">🛒</span>
                        <span className="font-medium">My Orders</span>
                      </Link>
                      <div className="border-t my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors w-full text-red-500"
                      >
                        <span className="text-xl">🚪</span>
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hidden sm:block px-5 py-2.5 font-medium text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 gradient-primary text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Get Started
                  </Link>
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
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
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col gap-1">
                <NavLink
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-gray-100 font-medium"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/pets-and-supplies"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-gray-100 font-medium"
                >
                  Pets & Supplies
                </NavLink>
                <NavLink
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-gray-100 font-medium"
                >
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-gray-100 font-medium"
                >
                  Contact
                </NavLink>
                {!user && (
                  <NavLink
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 rounded-xl hover:bg-gray-100 font-medium"
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>
    </>
  );
}

export default Navbar;
