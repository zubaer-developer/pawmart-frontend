import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";
import { API_URL } from "../backendConfig";

function ListingDetails() {
  useTitle("Details");
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/listings/${id}`)
      .then((res) => res.json())
      .then((data) => data.success && setListing(data.data));
  }, [id]);

  const handleOrder = async (e) => {
    e.preventDefault();
    const form = e.target;
    const orderData = {
      productId: listing._id,
      productName: listing.name,
      category: listing.category,
      buyerName: user.displayName,
      email: user.email,
      quantity: listing.category === "Pets" ? 1 : parseInt(form.qty.value),
      price: listing.price,
      address: form.address.value,
      phone: form.phone.value,
      date: form.date.value,
    };

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Order Placed! 🎉");
        navigate("/dashboard/my-orders");
      }
    } catch (err) {
      toast.error("Failed to order");
    }
  };

  if (!listing)
    return (
      <div className="text-center py-20 text-base-content/60">Loading...</div>
    );

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 transition-colors duration-300">
      <div className="bg-base-100 rounded-[2.5rem] shadow-xl overflow-hidden flex flex-col lg:flex-row border border-base-200">
        {/* Image */}
        <div className="lg:w-1/2 h-[400px] lg:h-auto relative group">
          <img
            src={listing.image}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <span className="bg-orange-500 px-4 py-1 rounded-full text-sm font-bold mb-3 inline-block shadow-lg">
              {listing.category}
            </span>
            <h1 className="text-4xl font-bold drop-shadow-md">
              {listing.name}
            </h1>
          </div>
        </div>

        {/* Details */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-base-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-primary">
              {listing.price === 0 ? "Free Adoption" : `৳${listing.price}`}
            </h2>
            <div className="text-base-content/60 flex items-center gap-2 font-medium">
              <span>📍</span> {listing.location}
            </div>
          </div>

          <div className="prose text-base-content/70 mb-8 leading-relaxed text-lg">
            <h3 className="text-xl font-bold text-base-content mb-3">About</h3>
            <p>{listing.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-base-200 rounded-2xl border border-base-300">
              <p className="text-base-content/50 text-xs uppercase font-bold mb-1">
                Posted By
              </p>
              <p className="font-semibold text-base-content truncate">
                {listing.email}
              </p>
            </div>
            <div className="p-4 bg-base-200 rounded-2xl border border-base-300">
              <p className="text-base-content/50 text-xs uppercase font-bold mb-1">
                Date
              </p>
              <p className="font-semibold text-base-content">{listing.date}</p>
            </div>
          </div>

          <button
            onClick={() => (user ? setShowModal(true) : navigate("/login"))}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 transition-all cursor-pointer text-lg"
          >
            {listing.category === "Pets" ? "🐾 Adopt Now" : "🛒 Order Now"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-base-100 rounded-3xl p-8 w-full max-w-md animate-bounce-in shadow-2xl border border-base-200">
            <h2 className="text-2xl font-bold mb-6 text-base-content">
              Complete Request
            </h2>
            <form onSubmit={handleOrder} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-base-content/50 uppercase ml-1">
                  Name
                </label>
                <input
                  type="text"
                  value={user.displayName}
                  readOnly
                  className="w-full px-4 py-3 bg-base-200 rounded-xl text-base-content border border-base-300 focus:outline-none cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-base-content/50 uppercase ml-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full px-4 py-3 bg-base-200 rounded-xl text-base-content border border-base-300 focus:outline-none cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-base-content/50 uppercase ml-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Delivery Address"
                  required
                  className="w-full px-4 py-3 bg-base-100 border-2 border-base-300 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-base-content placeholder:text-base-content/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-base-content/50 uppercase ml-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    required
                    className="w-full px-4 py-3 bg-base-100 border-2 border-base-300 rounded-xl focus:border-primary transition-all outline-none text-base-content placeholder:text-base-content/40"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-base-content/50 uppercase ml-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    className="w-full px-4 py-3 bg-base-100 border-2 border-base-300 rounded-xl focus:border-primary transition-all outline-none text-base-content"
                  />
                </div>
              </div>

              {listing.category !== "Pets" && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-base-content/50 uppercase ml-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="qty"
                    defaultValue="1"
                    min="1"
                    className="w-full px-4 py-3 bg-base-100 border-2 border-base-300 rounded-xl focus:border-primary transition-all outline-none text-base-content"
                  />
                </div>
              )}

              <div className="flex gap-3 mt-8 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-base-200 font-bold rounded-xl text-base-content hover:bg-base-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListingDetails;
