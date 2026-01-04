import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import Loading from "../../components/Loading";

function MyListings() {
  useTitle("My Listings");

  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

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
        const myListings = data.data.filter(
          (listing) => listing.email === user.email
        );
        setListings(myListings);
      } else {
        toast.error("Failed to fetch listings");
      }
    } catch (err) {
      toast.error("Error connecting to server");
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
        toast.success("Listing deleted successfully!");
      } else {
        toast.error("Failed to delete listing");
      }
    } catch (err) {
      toast.error("Error deleting listing");
      console.log(err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>My Listings</h1>
        <Link to="/dashboard/add-listing">
          <button style={{ padding: "10px 20px" }}>+ Add New</button>
        </Link>
      </div>

      <p>Total: {listings.length} listings</p>

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
                    <button style={{ marginRight: "5px" }}>Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(listing._id)}
                    style={{ color: "red" }}
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
