import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function CategoryPage() {
  const { categoryName } = useParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchListingsByCategory();
  }, [categoryName]);

  const fetchListingsByCategory = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/listings");
      const data = await response.json();

      if (data.success) {
        // Filter by category
        const filtered = data.data.filter(
          (listing) =>
            listing.category.toLowerCase() === categoryName.toLowerCase()
        );
        setListings(filtered);
      } else {
        setError("Failed to fetch listings");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <Link to="/pets-and-supplies">← Back to All Listings</Link>

      <h1>Category: {categoryName}</h1>
      <p>Total: {listings.length} listings</p>

      {listings.length === 0 ? (
        <p>No listings found in this category</p>
      ) : (
        <div>
          {listings.map((listing) => (
            <div
              key={listing._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px 0",
              }}
            >
              <h3>{listing.name}</h3>
              <p>
                Price:{" "}
                {listing.price === 0 ? "Free (Adoption)" : `$${listing.price}`}
              </p>
              <p>Location: {listing.location}</p>
              <Link to={`/listing/${listing._id}`}>See Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
