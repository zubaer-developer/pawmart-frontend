import { Outlet, Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import ThemeToggle from "../components/shared/ThemeToggle";
import Loading from "../components/Loading";

function MainLayout() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-base-200 transition-colors duration-300">
      <Navbar />

      <main className="grow">
        <Outlet />
      </main>

      <Footer />

      {/* Add Toggle Here */}
      <ThemeToggle />
    </div>
  );
}

export default MainLayout;
