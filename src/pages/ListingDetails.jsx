import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";
import Loading from "../components/Loading";

function ListingDetails() {
  useTitle("Listing Details");

  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/listings/${id}`);
      const data = await response.json();

      if (data.success) {
        setListing(data.data);
      } else {
        toast.error("Listing not found");
      }
    } catch (err) {
      toast.error("Error connecting to server");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderClick = () => {
    if (!user) {
      toast.error("Please login to order");
      navigate("/login", { state: { from: { pathname: `/listing/${id}` } } });
      return;
    }
    setShowOrderForm(true);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setOrderLoading(true);

    const form = e.target;

    const orderData = {
      productId: listing._id,
      productName: listing.name,
      category: listing.category,
      buyerName: user.displayName || form.buyerName.value,
      email: user.email,
      quantity: listing.category === "Pets" ? 1 : parseInt(form.quantity.value),
      price: listing.price,
      address: form.address.value,
      phone: form.phone.value,
      date: form.date.value,
      additionalNotes: form.notes.value,
    };

    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Order placed successfully!");
        form.reset();
        setShowOrderForm(false);
        navigate("/dashboard/my-orders");
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (err) {
      toast.error("Error connecting to server");
      console.log(err);
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!listing) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>Listing not found</p>
        <Link to="/pets-and-supplies">Back to Listings</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/pets-and-supplies">← Back to Listings</Link>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        {/* Image */}
        <div style={{ flex: "1", minWidth: "300px" }}>
          <img
            src={listing.image}
            alt={listing.name}
            style={{ width: "100%", maxWidth: "500px", borderRadius: "5px" }}
          />
        </div>

        {/* Details */}
        <div style={{ flex: "1", minWidth: "300px" }}>
          <h1>{listing.name}</h1>

          <p
            style={{
              display: "inline-block",
              backgroundColor: "#eee",
              padding: "5px 15px",
              borderRadius: "20px",
            }}
          >
            {listing.category}
          </p>

          <h2
            style={{
              marginTop: "20px",
              color: listing.price === 0 ? "green" : "inherit",
            }}
          >
            {listing.price === 0 ? "Free (Adoption)" : `৳${listing.price}`}
          </h2>

          <table style={{ marginTop: "20px" }}>
            <tbody>
              <tr>
                <td style={{ padding: "5px 20px 5px 0" }}>
                  <strong>Location:</strong>
                </td>
                <td>📍 {listing.location}</td>
              </tr>
              <tr>
                <td style={{ padding: "5px 20px 5px 0" }}>
                  <strong>Available:</strong>
                </td>
                <td>📅 {listing.date}</td>
              </tr>
              <tr>
                <td style={{ padding: "5px 20px 5px 0" }}>
                  <strong>Owner:</strong>
                </td>
                <td>📧 {listing.email}</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginTop: "20px" }}>Description</h3>
          <p>{listing.description}</p>

          {/* Order Button */}
          {!showOrderForm && (
            <button
              onClick={handleOrderClick}
              style={{
                padding: "15px 40px",
                marginTop: "20px",
                fontSize: "16px",
                backgroundColor: "#333",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              {listing.category === "Pets" ? "🐾 Adopt Now" : "🛒 Order Now"}
            </button>
          )}
        </div>
      </div>

      {/* Order Form */}
      {showOrderForm && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "30px",
            marginTop: "30px",
            maxWidth: "500px",
          }}
        >
          <h2>
            {listing.category === "Pets" ? "Adoption Form" : "Order Form"}
          </h2>

          <form onSubmit={handleOrderSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label>Your Name: *</label>
              <br />
              <input
                type="text"
                name="buyerName"
                defaultValue={user?.displayName || ""}
                required
                style={{ width: "100%", padding: "10px", marginTop: "5px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Your Email:</label>
              <br />
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  backgroundColor: "#f0f0f0",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Product:</label>
              <br />
              <input
                type="text"
                value={listing.name}
                readOnly
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  backgroundColor: "#f0f0f0",
                }}
              />
            </div>

            {listing.category !== "Pets" && (
              <div style={{ marginBottom: "15px" }}>
                <label>Quantity: *</label>
                <br />
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  defaultValue="1"
                  required
                  style={{ width: "100%", padding: "10px", marginTop: "5px" }}
                />
              </div>
            )}

            <div style={{ marginBottom: "15px" }}>
              <label>Delivery Address: *</label>
              <br />
              <textarea
                name="address"
                required
                rows="3"
                placeholder="Enter your full address"
                style={{ width: "100%", padding: "10px", marginTop: "5px" }}
              ></textarea>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Phone Number: *</label>
              <br />
              <input
                type="tel"
                name="phone"
                required
                placeholder="01XXXXXXXXX"
                style={{ width: "100%", padding: "10px", marginTop: "5px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Preferred Date: *</label>
              <br />
              <input
                type="date"
                name="date"
                required
                style={{ width: "100%", padding: "10px", marginTop: "5px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Additional Notes:</label>
              <br />
              <textarea
                name="notes"
                rows="2"
                placeholder="Any special instructions..."
                style={{ width: "100%", padding: "10px", marginTop: "5px" }}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={orderLoading}
              style={{ padding: "10px 30px", marginRight: "10px" }}
            >
              {orderLoading ? "Placing Order..." : "Confirm Order"}
            </button>
            <button
              type="button"
              onClick={() => setShowOrderForm(false)}
              style={{ padding: "10px 30px" }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ListingDetails;
