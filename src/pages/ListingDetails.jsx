import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ListingDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Order form state
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState("");

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
        setError("Listing not found");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderClick = () => {
    if (!user) {
      // Redirect to login if not logged in
      navigate("/login", { state: { from: { pathname: `/listing/${id}` } } });
      return;
    }
    setShowOrderForm(true);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setOrderError("");
    setOrderSuccess("");
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        setOrderSuccess("Order placed successfully!");
        form.reset();

        // Close form and redirect
        setTimeout(() => {
          setShowOrderForm(false);
          navigate("/dashboard/my-orders");
        }, 2000);
      } else {
        setOrderError(data.message || "Failed to place order");
      }
    } catch (err) {
      setOrderError("Error connecting to server");
      console.log(err);
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    return <p>Loading listing details...</p>;
  }

  if (error) {
    return (
      <div>
        <p style={{ color: "red" }}>{error}</p>
        <Link to="/pets-and-supplies">Back to Listings</Link>
      </div>
    );
  }

  if (!listing) {
    return <p>Listing not found</p>;
  }

  return (
    <div>
      <Link to="/pets-and-supplies">← Back to Listings</Link>

      <h1>{listing.name}</h1>

      {listing.image && (
        <img
          src={listing.image}
          alt={listing.name}
          style={{ maxWidth: "400px", display: "block", margin: "10px 0" }}
        />
      )}

      <table border="1" cellPadding="10">
        <tbody>
          <tr>
            <td>
              <strong>Category</strong>
            </td>
            <td>{listing.category}</td>
          </tr>
          <tr>
            <td>
              <strong>Price</strong>
            </td>
            <td>
              {listing.price === 0 ? "Free (Adoption)" : `৳${listing.price}`}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Location</strong>
            </td>
            <td>{listing.location}</td>
          </tr>
          <tr>
            <td>
              <strong>Owner Email</strong>
            </td>
            <td>{listing.email}</td>
          </tr>
          <tr>
            <td>
              <strong>Date</strong>
            </td>
            <td>{listing.date}</td>
          </tr>
        </tbody>
      </table>

      <h3>Description</h3>
      <p>{listing.description}</p>

      <hr />

      {/* Order Button */}
      {!showOrderForm && (
        <button
          onClick={handleOrderClick}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          {listing.category === "Pets" ? "Adopt Now" : "Order Now"}
        </button>
      )}

      {/* Order Form */}
      {showOrderForm && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          <h2>
            {listing.category === "Pets" ? "Adoption Form" : "Order Form"}
          </h2>

          {orderError && <p style={{ color: "red" }}>{orderError}</p>}
          {orderSuccess && <p style={{ color: "green" }}>{orderSuccess}</p>}

          <form onSubmit={handleOrderSubmit}>
            <div style={{ marginBottom: "10px" }}>
              <label>Your Name: *</label>
              <br />
              <input
                type="text"
                name="buyerName"
                defaultValue={user?.displayName || ""}
                required
                style={{ width: "300px", padding: "5px" }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Your Email:</label>
              <br />
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                style={{
                  width: "300px",
                  padding: "5px",
                  backgroundColor: "#f0f0f0",
                }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Product/Pet:</label>
              <br />
              <input
                type="text"
                value={listing.name}
                readOnly
                style={{
                  width: "300px",
                  padding: "5px",
                  backgroundColor: "#f0f0f0",
                }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Price:</label>
              <br />
              <input
                type="text"
                value={listing.price === 0 ? "Free" : `৳${listing.price}`}
                readOnly
                style={{
                  width: "300px",
                  padding: "5px",
                  backgroundColor: "#f0f0f0",
                }}
              />
            </div>

            {listing.category !== "Pets" && (
              <div style={{ marginBottom: "10px" }}>
                <label>Quantity: *</label>
                <br />
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  defaultValue="1"
                  required
                  style={{ width: "300px", padding: "5px" }}
                />
              </div>
            )}

            <div style={{ marginBottom: "10px" }}>
              <label>Delivery Address: *</label>
              <br />
              <textarea
                name="address"
                required
                rows="3"
                placeholder="Enter your full address"
                style={{ width: "300px", padding: "5px" }}
              ></textarea>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Phone Number: *</label>
              <br />
              <input
                type="tel"
                name="phone"
                required
                placeholder="01XXXXXXXXX"
                style={{ width: "300px", padding: "5px" }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Preferred Date: *</label>
              <br />
              <input
                type="date"
                name="date"
                required
                style={{ width: "310px", padding: "5px" }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Additional Notes:</label>
              <br />
              <textarea
                name="notes"
                rows="3"
                placeholder="Any special instructions..."
                style={{ width: "300px", padding: "5px" }}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={orderLoading}
              style={{ padding: "10px 20px", marginRight: "10px" }}
            >
              {orderLoading ? "Placing Order..." : "Confirm Order"}
            </button>
            <button
              type="button"
              onClick={() => setShowOrderForm(false)}
              style={{ padding: "10px 20px" }}
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
