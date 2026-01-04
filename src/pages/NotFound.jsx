import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

function NotFound() {
  useTitle("404 - Page Not Found");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 text-9xl opacity-5">🐾</div>
        <div className="absolute bottom-20 right-20 text-9xl opacity-5">🐾</div>
        <div className="absolute top-1/2 left-1/4 text-6xl opacity-5">🐕</div>
        <div className="absolute top-1/3 right-1/4 text-6xl opacity-5">🐈</div>
      </div>

      <div className="text-center relative z-10">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-orange-500 to-amber-500 leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl md:text-8xl animate-float">🐾</span>
          </div>
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
            className="btn btn-lg bg-gradient-to-r from-primary-500 to-orange-600 text-white border-0 hover:from-primary-600 hover:to-orange-700 gap-2"
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

        {/* Fun Fact */}
        <div className="mt-12 p-4 bg-white/5 rounded-xl border border-white/10 max-w-sm mx-auto">
          <p className="text-gray-400 text-sm">
            💡 <span className="text-primary-400">Fun Fact:</span> Dogs can
            understand up to 250 words and gestures!
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
