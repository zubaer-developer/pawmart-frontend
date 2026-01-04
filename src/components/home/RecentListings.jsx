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

  if (loading) {
    return (
      <p style={{ textAlign: "center", padding: "40px" }}>
        Loading recent listings...
      </p>
    );
  }

  return (
    <section style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center" }}>Recent Listings</h2>
      <p style={{ textAlign: "center" }}>
        Check out our latest pets and products
      </p>

      {listings.length === 0 ? (
        <p style={{ textAlign: "center" }}>No listings available yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginTop: "20px",
            maxWidth: "900px",
            margin: "20px auto",
          }}
        >
          {listings.map((listing) => (
            <div
              key={listing._id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                backgroundColor: "white",
              }}
            >
              <img
                src={listing.image}
                alt={listing.name}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <h3>{listing.name}</h3>
              <p>Category: {listing.category}</p>
              <p>
                {listing.price === 0 ? (
                  <span style={{ color: "green" }}>Free for Adoption</span>
                ) : (
                  <span>৳{listing.price}</span>
                )}
              </p>
              <p>{listing.location}</p>
              <Link to={`/listing/${listing._id}`}>
                <button style={{ width: "100%", padding: "8px" }}>
                  See Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/pets-and-supplies">
          <button style={{ padding: "10px 30px" }}>View All Listings</button>
        </Link>
      </div>
    </section>
  );
}

export default RecentListings;
