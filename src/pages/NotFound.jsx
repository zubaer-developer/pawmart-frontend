import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

function NotFound() {
  useTitle("404 - Page Not Found");

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 overflow-hidden relative">
      <div className="text-center relative z-10">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-black gradient-text leading-none">
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Oops! Lost in the Pet Park
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg">
          The page you're looking for has wandered off. Let's get you back to
          safety!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn btn-lg gradient-primary text-white border-0 hover:opacity-90 gap-2"
          >
            <span>🏠</span> Back to Home
          </Link>
          <Link
            to="/pets-and-supplies"
            className="btn btn-lg btn-outline text-white border-white/30 hover:bg-white/10 hover:border-white/50 gap-2"
          >
            <span>🐾</span> Browse Pets
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
