import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import { API_URL } from "../../backendConfig";

function UpdateListing() {
  useTitle("Update Listing");

  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/listings/${id}`);
      const data = await response.json();

      if (data.success) {
        if (data.data.email !== user.email) {
          toast.error("You can only edit your own listings");
          navigate("/dashboard/my-listings");
          return;
        }
        setListing(data.data);
      } else {
        toast.error("Listing not found");
        navigate("/dashboard/my-listings");
      }
    } catch (err) {
      toast.error("Error fetching listing", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;

    const updatedData = {
      name: form.name.value,
      category: form.category.value,
      price: parseFloat(form.price.value) || 0,
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      date: form.date.value,
    };

    try {
      const response = await fetch(`${API_URL}/listings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Listing updated! ✅");
        navigate("/dashboard/my-listings");
      } else {
        toast.error(data.message || "Failed to update");
      }
    } catch (err) {
      toast.error("Error connecting to server", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-base-100 rounded-3xl p-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="space-y-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!listing) return null;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/dashboard/my-listings"
          className="w-10 h-10 bg-base-300 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          ←
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-base-content">
            Update Listing
          </h1>
          <p className="text-gray-500">Edit your pet or product details</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-base-100 rounded-3xl shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Category */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                required
                defaultValue={listing.name}
                className="w-full px-4 py-3 bg-base-200 border-2 border-gray-100 rounded-xl focus:border-orange-400 focus:bg-base-100 transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                required
                defaultValue={listing.category}
                className="w-full px-4 py-3 bg-base-200 border-2 border-gray-100 rounded-xl focus:border-orange-400 focus:bg-base-100 transition-all outline-none"
              >
                <option value="Pets">🐾 Pets</option>
                <option value="Food">🍖 Food</option>
                <option value="Accessories">🎾 Accessories</option>
                <option value="Care Products">💊 Care Products</option>
              </select>
            </div>
          </div>

          {/* Price & Location */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price *
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                defaultValue={listing.price}
                className="w-full px-4 py-3 bg-base-200 border-2 border-gray-100 rounded-xl focus:border-orange-400 focus:bg-base-100 transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                required
                defaultValue={listing.location}
                className="w-full px-4 py-3 bg-base-200 border-2 border-gray-100 rounded-xl focus:border-orange-400 focus:bg-base-100 transition-all outline-none"
              />
            </div>
          </div>

          {/* Image & Date */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                required
                defaultValue={listing.image}
                className="w-full px-4 py-3 bg-base-200 border-2 border-gray-100 rounded-xl focus:border-orange-400 focus:bg-base-100 transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                name="date"
                required
                defaultValue={listing.date}
                className="w-full px-4 py-3 bg-base-200 border-2 border-gray-100 rounded-xl focus:border-orange-400 focus:bg-base-100 transition-all outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              required
              rows="4"
              defaultValue={listing.description}
              className="w-full px-4 py-3 bg-base-200 border-2 border-gray-100 rounded-xl focus:border-orange-400 focus:bg-base-100 transition-all outline-none resize-none"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-4 gradient-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
            >
              {submitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Updating...
                </>
              ) : (
                <>Update Listing</>
              )}
            </button>
            <Link
              to="/dashboard/my-listings"
              className="px-8 py-4 bg-base-300 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateListing;
