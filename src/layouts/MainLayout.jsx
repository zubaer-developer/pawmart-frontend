import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import Loading from "../components/Loading";

function MainLayout() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MainLayout;
