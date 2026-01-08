import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

function MyListings() {
  useTitle("My Listings");

  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchMyListings();
    }
  }, [user]);

  const fetchMyListings = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/listings");
      const data = await response.json();

      if (data.success) {
        const myListings = data.data.filter(
          (listing) => listing.email === user.email
        );
        setListings(myListings);
      } else {
        toast.error("Failed to fetch listings");
      }
    } catch (err) {
      toast.error("Error connecting to server", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;

    try {
      const response = await fetch(`http://localhost:5000/listings/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        setListings(listings.filter((listing) => listing._id !== id));
        toast.success("Listing deleted! 🗑️");
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      toast.error("Error deleting listing", err);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-base-content">My Listings</h1>
          <p className="text-gray-500">Manage your pets and products</p>
        </div>
        <Link
          to="/dashboard/add-listing"
          className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <span>➕</span> Add New
        </Link>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-base-100 rounded-2xl p-4 animate-pulse">
              <div className="w-full h-40 bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="bg-base-100 rounded-3xl p-12 text-center">
          <span className="text-6xl mb-4 block">📋</span>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No Listings Yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start by adding your first pet or product listing
          </p>
          <Link
            to="/dashboard/add-listing"
            className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white font-semibold rounded-xl"
          >
            <span>➕</span> Create Listing
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="bg-base-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-base-100/90 backdrop-blur-sm text-gray-800 text-sm font-medium rounded-full">
                    {listing.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 text-white text-sm font-bold rounded-full ${
                      listing.price === 0 ? "bg-green-500" : "bg-orange-500"
                    }`}
                  >
                    {listing.price === 0 ? "Free" : `৳${listing.price}`}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-base-content mb-2 truncate">
                  {listing.name}
                </h3>
                <p className="text-gray-500 text-sm flex items-center gap-2 mb-4">
                  <span>📍</span> {listing.location}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    to={`/dashboard/update-listing/${listing._id}`}
                    className="flex-1 py-2 bg-base-300 text-gray-700 font-medium rounded-xl text-center hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="flex-1 py-2 bg-base-300 text-red-500 font-medium rounded-xl hover:bg-red-500 hover:text-white transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyListings;
