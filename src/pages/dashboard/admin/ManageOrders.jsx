import { useState, useEffect } from "react";
import { API_URL } from "../../../backendConfig";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/orders`);
      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
      } else {
        setError("Failed to fetch orders");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();

      if (data.success) {
        // Update local state
        setOrders(
          orders.map((order) =>
            order._id === id ? { ...order, status: newStatus } : order
          )
        );
        alert(`Order status updated to ${newStatus}!`);
      } else {
        alert("Failed to update order status");
      }
    } catch (err) {
      alert("Error updating order");
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/orders/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        setOrders(orders.filter((order) => order._id !== id));
        alert("Order deleted successfully!");
      } else {
        alert("Failed to delete order");
      }
    } catch (err) {
      alert("Error deleting order");
      console.log(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "orange";
      case "completed":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  if (loading) {
    return <p>Loading all orders...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h1>Manage All Orders</h1>
      <p>Total: {orders.length} orders</p>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ marginTop: "20px", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Product</th>
              <th>Buyer</th>
              <th>Email</th>
              <th>Price</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.productName}</td>
                <td>{order.buyerName}</td>
                <td>{order.email}</td>
                <td>{order.price === 0 ? "Free" : `৳${order.price}`}</td>
                <td>{order.phone}</td>
                <td>{order.date}</td>
                <td>
                  <span style={{ color: getStatusColor(order.status) }}>
                    {order.status?.toUpperCase() || "PENDING"}
                  </span>
                </td>
                <td>
                  <select
                    value={order.status || "pending"}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    style={{ marginRight: "10px" }}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => handleDelete(order._id)}
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

export default ManageOrders;
