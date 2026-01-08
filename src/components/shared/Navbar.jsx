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

  // Changed hover colors to use theme opacity
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
      isActive
        ? "text-primary bg-primary/10"
        : "text-base-content/70 hover:text-primary hover:bg-primary/5"
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-base-100/90 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-105 transition-transform duration-300 text-white">
                🐾
              </div>
              <div>
                <span className="text-2xl font-bold">
                  <span className="text-primary">Paw</span>
                  <span className="text-base-content">Mart</span>{" "}
                </span>
                <p className="text-xs text-base-content/60 -mt-1 hidden sm:block">
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
                      <p className="font-semibold text-base-content group-hover:text-primary transition-colors">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-base-content/60">
                        Welcome back!
                      </p>
                    </div>
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-300">
                        <img
                          src={
                            user.photoURL || "https://i.pravatar.cc/150?img=1"
                          }
                          alt={user.displayName || "User"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </label>

                  {/* Dropdown Menu */}
                  <div
                    tabIndex={0}
                    className="dropdown-content mt-4 z-50 w-72 bg-base-100 rounded-2xl shadow-2xl border border-base-200 overflow-hidden"
                  >
                    <div className="p-4 bg-linear-to-r from-orange-500 to-amber-500 text-white">
                      <p className="font-bold text-lg">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-sm opacity-80 truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-base-200 transition-colors text-base-content"
                      >
                        <span className="text-xl">📊</span>
                        <span className="font-medium">Dashboard</span>
                      </Link>
                      {/* ... other links ... */}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-colors w-full text-red-500"
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
                    className="hidden sm:block px-5 py-2.5 font-medium text-base-content/70 hover:text-primary transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 bg-linear-to-r from-orange-500 to-amber-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-20"></div>
    </>
  );
}

export default Navbar;
