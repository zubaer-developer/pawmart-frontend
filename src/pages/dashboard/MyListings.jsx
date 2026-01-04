import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function MyListings() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.email) {
      fetchMyListings();
    }
  }, [user]);

  const fetchMyListings = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/listings");
      const data = await response.json();

      if (data.success) {
        // Filter listings by current user email
        const myListings = data.data.filter(
          (listing) => listing.email === user.email
        );
        setListings(myListings);
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
        // Remove from local state
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
    return <p>Loading your listings...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h1>My Listings</h1>
      <p>Total: {listings.length} listings</p>

      <Link to="/dashboard/add-listing">+ Add New Listing</Link>

      {listings.length === 0 ? (
        <p>You have no listings yet.</p>
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
              <th>Date</th>
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
                <td>{listing.date}</td>
                <td>
                  <Link to={`/dashboard/update-listing/${listing._id}`}>
                    Edit
                  </Link>
                  {" | "}
                  <button
                    onClick={() => handleDelete(listing._id)}
                    style={{
                      color: "red",
                      cursor: "pointer",
                      background: "none",
                      border: "none",
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

export default MyListings;
