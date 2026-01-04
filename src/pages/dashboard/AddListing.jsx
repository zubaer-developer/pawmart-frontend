import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

function AddListing() {
  useTitle("Add Listing");

  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const listingData = {
      name: form.name.value,
      category: form.category.value,
      price: parseFloat(form.price.value) || 0,
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      date: form.date.value,
      email: user.email,
    };

    try {
      const response = await fetch("http://localhost:5000/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(listingData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Listing created successfully!");
        form.reset();
        navigate("/dashboard/my-listings");
      } else {
        toast.error(data.message || "Failed to create listing");
      }
    } catch (err) {
      toast.error("Error connecting to server");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const priceInput = document.querySelector('input[name="price"]');

    if (category === "Pets") {
      priceInput.value = "0";
      priceInput.readOnly = true;
    } else {
      priceInput.readOnly = false;
    }
  };

  return (
    <div>
      <h1>Add New Listing</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Pet/Product Name: *</label>
          <br />
          <input
            type="text"
            name="name"
            required
            placeholder="Enter name"
            style={{ width: "300px", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Category: *</label>
          <br />
          <select
            name="category"
            required
            onChange={handleCategoryChange}
            style={{ width: "320px", padding: "8px" }}
          >
            <option value="">Select Category</option>
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
            defaultValue="0"
            style={{ width: "300px", padding: "8px" }}
          />
          <small style={{ display: "block", color: "#666" }}>
            Set 0 for free pet adoption
          </small>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Location: *</label>
          <br />
          <input
            type="text"
            name="location"
            required
            placeholder="e.g., Dhaka"
            style={{ width: "300px", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Description: *</label>
          <br />
          <textarea
            name="description"
            required
            rows="4"
            placeholder="Describe your pet or product..."
            style={{ width: "300px", padding: "8px" }}
          ></textarea>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Image URL: *</label>
          <br />
          <input
            type="url"
            name="image"
            required
            placeholder="https://example.com/image.jpg"
            style={{ width: "300px", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Available Date: *</label>
          <br />
          <input
            type="date"
            name="date"
            required
            style={{ width: "320px", padding: "8px" }}
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
              padding: "8px",
              backgroundColor: "#f0f0f0",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: "10px 30px", marginTop: "10px" }}
        >
          {loading ? "Creating..." : "Create Listing"}
        </button>
      </form>
    </div>
  );
}

export default AddListing;
