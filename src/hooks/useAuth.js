import { useContext } from "react";
import AuthContext from "../providers/AuthContext";

function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}

export default useAuth;
