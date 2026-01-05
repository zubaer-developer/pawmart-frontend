import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RecentListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentListings();
  }, []);

  const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
      window.location.hostname === "[::1]"
  );

  const API_BASE_URL = isLocalhost
    ? "http://localhost:5000"
    : "https://pawmart-backend-beta.vercel.app";

  const fetchRecentListings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/listings-recent`);
      const data = await response.json();
      if (data.success) {
        setListings(data.data);
      }
    } catch (err) {
      console.log("Error fetching recent listings:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto ">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-1 block">
              New Arrivals
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
              Recent Listings
            </h2>
          </div>
          <Link
            to="/pets-and-supplies"
            className="hidden sm:block text-sm font-bold text-orange-500 hover:underline"
          >
            View All →
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-100 dark:bg-gray-900 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-10 opacity-50">
            <p className="text-lg">No listings available yet. 🐾</p>
          </div>
        ) : (
          /* Grid: 2 columns on mobile, 4 on desktop */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {listings.map((listing, index) => (
              <div
                key={listing._id}
                className="group bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden border border-transparent hover:border-orange-200 dark:hover:border-orange-900/30 transition-all duration-300 shadow-sm hover:shadow-md"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-40 md:h-44 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold rounded-md uppercase">
                      {listing.category}
                    </span>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-2 right-2">
                    <span
                      className={`px-2 py-1 rounded-lg text-[11px] font-bold text-white shadow-sm ${
                        listing.price === 0 ? "bg-green-500" : "bg-orange-500"
                      }`}
                    >
                      {listing.price === 0 ? "Free" : `৳${listing.price}`}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white truncate mb-1">
                    {listing.name}
                  </h3>

                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-[11px] mb-3">
                    <span>📍</span>
                    <span className="truncate">{listing.location}</span>
                  </div>

                  <Link
                    to={`/listing/${listing._id}`}
                    className="block w-full text-center py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold rounded-xl group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all active:scale-95"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile-only View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/pets-and-supplies"
            className="btn btn-ghost btn-sm text-orange-500"
          >
            View All Listings →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RecentListings;
