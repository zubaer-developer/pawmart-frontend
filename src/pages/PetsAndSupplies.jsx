import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

function PetsAndSupplies() {
  useTitle("Pets & Supplies");
  // All listings from database
  const [allListings, setAllListings] = useState([]);

  // Filtered listings to display
  const [filteredListings, setFilteredListings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter values
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  // Step 1: Fetch all listings once
  useEffect(() => {
    fetchListings();
  }, []);

  // Step 2: Apply filters whenever filter values change
  useEffect(() => {
    applyFilters();
  }, [search, category, sort, allListings]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/listings");
      const data = await response.json();

      if (data.success) {
        setAllListings(data.data);
        setFilteredListings(data.data);
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

  const applyFilters = () => {
    let result = [...allListings];

    // Filter by search
    if (search) {
      result = result.filter((listing) =>
        listing.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (category) {
      result = result.filter((listing) => listing.category === category);
    }

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

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSort("");
  };

  if (loading) {
    return <p>Loading listings...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pets and Supplies</h1>

      {/* Search and Filter Section */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        {/* Search */}
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            style={{ padding: "10px", width: "300px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {/* Category Filter */}
          <div>
            <label>Category: </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: "8px" }}
            >
              <option value="">All Categories</option>
              <option value="Pets">Pets</option>
              <option value="Food">Food</option>
              <option value="Accessories">Accessories</option>
              <option value="Care Products">Care Products</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label>Sort: </label>
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

          {/* Clear Button */}
          <button onClick={clearFilters} style={{ padding: "8px 15px" }}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Count */}
      <p>
        Showing {filteredListings.length} of {allListings.length} listings
      </p>

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {filteredListings.map((listing) => (
            <div
              key={listing._id}
              style={{ border: "1px solid #ddd", padding: "15px" }}
            >
              <img
                src={listing.image}
                alt={listing.name}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <h3>{listing.name}</h3>
              <p>{listing.category}</p>
              <p>
                {listing.price === 0 ? (
                  <span style={{ color: "green" }}>Free (Adoption)</span>
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
    </div>
  );
}

export default PetsAndSupplies;
