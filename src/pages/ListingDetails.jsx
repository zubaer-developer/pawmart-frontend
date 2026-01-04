import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
              {listing.price === 0 ? "Free (Adoption)" : `$${listing.price}`}
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

      <button>Adopt / Order Now</button>
    </div>
  );
}

export default ListingDetails;
