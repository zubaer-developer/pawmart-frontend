import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";

function ListingDetails() {
  useTitle("Details");
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/listings/${id}`)
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
      const res = await fetch("http://localhost:5000/orders", {
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
      toast.error("Failed to order", err);
    }
  };

  if (!listing) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="bg-base-100 rounded-[2.5rem] shadow-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Image */}
        <div className="lg:w-1/2 h-100 lg:h-auto relative group">
          <img
            src={listing.image}
            className="w-full h-full object-cover"
            alt=""
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <span className="bg-orange-500 px-4 py-1 rounded-full text-sm font-bold mb-3 inline-block">
              {listing.category}
            </span>
            <h1 className="text-4xl font-bold">{listing.name}</h1>
          </div>
        </div>

        {/* Details */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-orange-500">
              {listing.price === 0 ? "Free Adoption" : `৳${listing.price}`}
            </h2>
            <div className="text-gray-500 flex items-center gap-2">
              <span>📍</span> {listing.location}
            </div>
          </div>

          <div className="prose text-base-content/70 mb-8 leading-relaxed">
            <h3 className="text-xl font-bold text-base-content mb-3">About</h3>
            <p>{listing.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-base-200 rounded-2xl">
              <p className="text-gray-400 text-xs uppercase font-bold">
                Posted By
              </p>
              <p className="font-semibold text-base-content">{listing.email}</p>
            </div>
            <div className="p-4 bg-base-200 rounded-2xl">
              <p className="text-gray-400 text-xs uppercase font-bold">Date</p>
              <p className="font-semibold text-base-content">{listing.date}</p>
            </div>
          </div>

          <button
            onClick={() => (user ? setShowModal(true) : navigate("/login"))}
            className="w-full py-4 gradient-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
          >
            {listing.category === "Pets" ? "🐾 Adopt Now" : "🛒 Order Now"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-base-100 rounded-3xl p-8 w-full max-w-md animate-float">
            <h2 className="text-2xl font-bold mb-6">Complete Request</h2>
            <form onSubmit={handleOrder} className="space-y-4">
              <input
                type="text"
                value={user.displayName}
                readOnly
                className="w-full px-4 py-3 bg-base-300 rounded-xl"
              />
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full px-4 py-3 bg-base-300 rounded-xl"
              />
              <input
                type="text"
                name="address"
                placeholder="Delivery Address"
                required
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-orange-400 outline-none"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-orange-400 outline-none"
              />
              <input
                type="date"
                name="date"
                required
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-orange-400 outline-none"
              />
              {listing.category !== "Pets" && (
                <input
                  type="number"
                  name="qty"
                  defaultValue="1"
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl"
                />
              )}
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-base-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 gradient-primary text-white font-bold rounded-xl cursor-pointer"
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
