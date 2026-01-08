import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

function AddListing() {
  useTitle("Add Listing");

  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const listingData = {
      name: form.name.value,
      category: form.category.value,
      price: parseFloat(form.price.value) || 0,
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      date: form.date.value,
      email: user.email,
    };

    try {
      const response = await fetch("http://localhost:5000/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(listingData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Listing created successfully! 🎉");
        form.reset();
        navigate("/dashboard/my-listings");
      } else {
        toast.error(data.message || "Failed to create listing");
      }
    } catch (err) {
      toast.error("Error connecting to server");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add New Listing</h1>
        <p className="text-gray-500">Create a new pet or product listing</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Category Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pet/Product Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter name"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-orange-400 focus:bg-white transition-all outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-orange-400 focus:bg-white transition-all outline-none"
              >
                <option value="">Select Category</option>
                <option value="Pets">🐾 Pets (Adoption)</option>
                <option value="Food">🍖 Pet Food</option>
                <option value="Accessories">🎾 Accessories</option>
                <option value="Care Products">💊 Care Products</option>
              </select>
            </div>
          </div>

          {/* Price & Location Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (BDT) *
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                defaultValue={category === "Pets" ? "0" : ""}
                readOnly={category === "Pets"}
                placeholder="0 for free adoption"
                className={`w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-orange-400 transition-all outline-none ${
                  category === "Pets"
                    ? "bg-gray-100"
                    : "bg-gray-50 focus:bg-white"
                }`}
              />
              {category === "Pets" && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ Pets are free for adoption
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                required
                placeholder="e.g., Dhaka, Chittagong"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-orange-400 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL *
            </label>
            <input
              type="url"
              name="image"
              required
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-orange-400 focus:bg-white transition-all outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use ImgBB, Imgur, or any image hosting service
            </p>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Available Date *
            </label>
            <input
              type="date"
              name="date"
              required
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-orange-400 focus:bg-white transition-all outline-none"
            />
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
              placeholder="Describe your pet or product in detail..."
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-orange-400 focus:bg-white transition-all outline-none resize-none"
            ></textarea>
          </div>

          {/* Owner Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-100 rounded-xl text-gray-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 gradient-primary text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Creating...
              </>
            ) : (
              <>
                <span>➕</span> Create Listing
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
