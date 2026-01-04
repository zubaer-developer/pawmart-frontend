import { useState, useEffect } from "react";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/users");
      const data = await response.json();

      if (data.success) {
        setUsers(data.data);
      } else {
        setError("Failed to fetch users");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMakeAdmin = async (id) => {
    const confirmAction = window.confirm("Make this user an admin?");
    if (!confirmAction) return;

    try {
      const response = await fetch(`http://localhost:5000/users/admin/${id}`, {
        method: "PUT",
      });
      const data = await response.json();

      if (data.success) {
        alert("User is now an admin!");
        fetchUsers();
      } else {
        alert("Failed to update user role");
      }
    } catch (err) {
      alert("Error updating user");
      console.log(err);
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        setUsers(users.filter((user) => user._id !== id));
        alert("User deleted successfully!");
      } else {
        alert("Failed to delete user");
      }
    } catch (err) {
      alert("Error deleting user");
      console.log(err);
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h1>Manage Users</h1>
      <p>Total: {users.length} users</p>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ marginTop: "20px", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    style={{
                      color: user.role === "admin" ? "green" : "gray",
                      fontWeight: user.role === "admin" ? "bold" : "normal",
                    }}
                  >
                    {user.role?.toUpperCase() || "USER"}
                  </span>
                </td>
                <td>
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      style={{ marginRight: "10px" }}
                    >
                      Make Admin
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteUser(user._id)}
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

export default ManageUsers;
