import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import Loading from "../components/Loading";

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const { isAdmin, adminLoading } = useAdmin();
  const location = useLocation();

  if (loading || adminLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default AdminRoute;
