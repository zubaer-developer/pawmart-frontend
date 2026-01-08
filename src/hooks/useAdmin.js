import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { API_URL } from "../backendConfig";

function useAdmin() {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      checkAdminStatus();
    } else {
      setIsAdmin(false);
      setAdminLoading(false);
    }
  }, [user]);

  const checkAdminStatus = async () => {
    try {
      setAdminLoading(true);
      const response = await fetch(`${API_URL}/users/admin/${user.email}`);
      const data = await response.json();
      setIsAdmin(data.admin);
    } catch (error) {
      console.log("Error checking admin status:", error);
      setIsAdmin(false);
    } finally {
      setAdminLoading(false);
    }
  };

  return { isAdmin, adminLoading, authLoading };
}

export default useAdmin;
