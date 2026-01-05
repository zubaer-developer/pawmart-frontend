import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RecentListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentListings();
  }, []);

  const fetchRecentListings = async () => {
    try {
      const response = await fetch("http://localhost:5000/listings-recent");
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
    <section className="py-20 bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4">
            Fresh Arrivals
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recent Listings
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check out the latest pets and products added to our marketplace
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-2xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded-lg mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
              </div>
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🐾</span>
            <p className="text-gray-500">
              No listings available yet. Be the first to add!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing, index) => (
              <div
                key={listing._id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-medium rounded-full">
                      {listing.category}
                    </span>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 ${
                        listing.price === 0 ? "bg-green-500" : "bg-orange-500"
                      } text-white text-sm font-bold rounded-full`}
                    >
                      {listing.price === 0 ? "Free" : `৳${listing.price}`}
                    </span>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                    {listing.name}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <span>📍</span>
                    <span>{listing.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                        👤
                      </div>
                      <span className="text-sm text-gray-500 truncate max-w-[120px]">
                        {listing.email?.split("@")[0]}
                      </span>
                    </div>

                    <Link
                      to={`/listing/${listing._id}`}
                      className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/pets-and-supplies"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300 shadow-lg"
          >
            <span>View All Listings</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RecentListings;
