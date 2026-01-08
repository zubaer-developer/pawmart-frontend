import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useTitle from "../../../hooks/useTitle";

function ManageUsers() {
  useTitle("Manage Users");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      const data = await response.json();
      if (data.success) setUsers(data.data);
    } catch (err) {
      toast.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMakeAdmin = async (id) => {
    if (!window.confirm("Make this user an admin?")) return;
    try {
      const res = await fetch(`http://localhost:5000/users/admin/${id}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("User promoted to Admin! 👑");
        fetchUsers();
      }
    } catch (err) {
      toast.error("Error updating user", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter((u) => u._id !== id));
        toast.success("User deleted! 🗑️");
      }
    } catch (err) {
      toast.error("Error deleting user", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-base-content mb-6">
        Manage Users
      </h1>

      <div className="bg-base-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-base-200 border-b border-gray-100">
              <tr>
                <th className="p-6 font-semibold text-base-content/70">User</th>
                <th className="p-6 font-semibold text-base-content/70">Role</th>
                <th className="p-6 font-semibold text-base-content/70">
                  Joined
                </th>
                <th className="p-6 font-semibold text-base-content/70">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-base-200 transition-colors"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={user.avatar || "https://i.pravatar.cc/150?img=1"}
                        className="w-10 h-10 rounded-full object-cover"
                        alt=""
                      />
                      <div>
                        <p className="font-bold text-base-content">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        user.role === "admin"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {user.role?.toUpperCase() || "USER"}
                    </span>
                  </td>
                  <td className="p-6 text-gray-500 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-6 flex gap-2">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="px-3 py-1.5 bg-green-100 text-green-600 rounded-lg text-sm font-bold hover:bg-green-200"
                      >
                        Make Admin
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-sm font-bold hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
