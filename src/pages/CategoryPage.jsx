import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function CategoryPage() {
  const { categoryName } = useParams();

  const [allListings, setAllListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("");

  // Fetch all listings once
  useEffect(() => {
    fetchListings();
  }, []);

  // Filter by category
  useEffect(() => {
    filterAndSort();
  }, [allListings, categoryName, sort]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/listings");
      const data = await response.json();

      if (data.success) {
        setAllListings(data.data);
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

  const filterAndSort = () => {
    // Filter by category
    let result = allListings.filter(
      (listing) => listing.category.toLowerCase() === categoryName.toLowerCase()
    );

    // Sort
    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredListings(result);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/pets-and-supplies">← Back to All Listings</Link>

      <h1>Category: {categoryName}</h1>

      {/* Sort Option */}
      <div style={{ margin: "20px 0" }}>
        <label>Sort by: </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
        </select>
      </div>

      <p>Total: {filteredListings.length} listings</p>

      {filteredListings.length === 0 ? (
        <p>No listings found in this category</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {filteredListings.map((listing) => (
            <div
              key={listing._id}
              style={{ border: "1px solid #ccc", padding: "15px" }}
            >
              <img
                src={listing.image}
                alt={listing.name}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <h3>{listing.name}</h3>
              <p>
                {listing.price === 0 ? (
                  <span style={{ color: "green" }}>Free (Adoption)</span>
                ) : (
                  <span>৳{listing.price}</span>
                )}
              </p>
              <p> {listing.location}</p>
              <Link to={`/listing/${listing._id}`}>
                <button style={{ width: "100%", padding: "8px" }}>
                  See Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
