import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

function NotFound() {
  useTitle("404 - Page Not Found");
  return (
    <div>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
}

export default NotFound;
