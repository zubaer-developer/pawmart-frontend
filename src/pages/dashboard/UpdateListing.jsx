import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function UpdateListing() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/listings/${id}`);
      const data = await response.json();

      if (data.success) {
        // Check if this listing belongs to current user
        if (data.data.email !== user.email) {
          setError("You can only edit your own listings");
          return;
        }
        setListing(data.data);
      } else {
        setError("Listing not found");
      }
    } catch (err) {
      setError("Error fetching listing");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    const form = e.target;

    const updatedData = {
      name: form.name.value,
      category: form.category.value,
      price: parseFloat(form.price.value) || 0,
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      date: form.date.value,
    };

    try {
      const response = await fetch(`http://localhost:5000/listings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Listing updated successfully!");

        setTimeout(() => {
          navigate("/dashboard/my-listings");
        }, 1000);
      } else {
        setError(data.message || "Failed to update listing");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading listing...</p>;
  }

  if (error && !listing) {
    return (
      <div>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => navigate("/dashboard/my-listings")}>
          Back to My Listings
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Update Listing</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Pet/Product Name: *</label>
          <br />
          <input
            type="text"
            name="name"
            required
            defaultValue={listing?.name}
            style={{ width: "300px", padding: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Category: *</label>
          <br />
          <select
            name="category"
            required
            defaultValue={listing?.category}
            style={{ width: "310px", padding: "5px" }}
          >
            <option value="Pets">Pets (Adoption)</option>
            <option value="Food">Pet Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Care Products">Care Products</option>
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Price (BDT): *</label>
          <br />
          <input
            type="number"
            name="price"
            required
            min="0"
            defaultValue={listing?.price}
            style={{ width: "300px", padding: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Location: *</label>
          <br />
          <input
            type="text"
            name="location"
            required
            defaultValue={listing?.location}
            style={{ width: "300px", padding: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Description: *</label>
          <br />
          <textarea
            name="description"
            required
            rows="4"
            defaultValue={listing?.description}
            style={{ width: "300px", padding: "5px" }}
          ></textarea>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Image URL: *</label>
          <br />
          <input
            type="url"
            name="image"
            required
            defaultValue={listing?.image}
            style={{ width: "300px", padding: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Available Date: *</label>
          <br />
          <input
            type="date"
            name="date"
            required
            defaultValue={listing?.date}
            style={{ width: "310px", padding: "5px" }}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          style={{ padding: "10px 20px", marginTop: "10px" }}
        >
          {submitting ? "Updating..." : "Update Listing"}
        </button>{" "}
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-listings")}
          style={{ padding: "10px 20px", marginTop: "10px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateListing;
