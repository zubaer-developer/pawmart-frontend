import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ManageListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllListings();
  }, []);

  const fetchAllListings = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/listings");
      const data = await response.json();

      if (data.success) {
        setListings(data.data);
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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/listings/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        setListings(listings.filter((listing) => listing._id !== id));
        alert("Listing deleted successfully!");
      } else {
        alert("Failed to delete listing");
      }
    } catch (err) {
      alert("Error deleting listing");
      console.log(err);
    }
  };

  if (loading) {
    return <p>Loading all listings...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h1>Manage All Listings</h1>
      <p>Total: {listings.length} listings</p>

      {listings.length === 0 ? (
        <p>No listings found</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ marginTop: "20px", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Location</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing._id}>
                <td>
                  <img
                    src={listing.image}
                    alt={listing.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{listing.name}</td>
                <td>{listing.category}</td>
                <td>{listing.price === 0 ? "Free" : `৳${listing.price}`}</td>
                <td>{listing.location}</td>
                <td>{listing.email}</td>
                <td>
                  <Link to={`/listing/${listing._id}`}>View</Link>
                  {" | "}
                  <button
                    onClick={() => handleDelete(listing._id)}
                    style={{
                      color: "red",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageListings;
