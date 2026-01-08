import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

function MyOrders() {
  useTitle("My Orders");

  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchMyOrders();
    }
  }, [user]);

  const fetchMyOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/orders/user/${user.email}`
      );
      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (err) {
      toast.error("Error connecting to server", err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("PawMart - My Orders Report", 14, 22);

    doc.setFontSize(12);
    doc.text(`User: ${user?.displayName || user?.email}`, 14, 35);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 42);
    doc.text(`Total Orders: ${orders.length}`, 14, 49);

    const tableData = orders.map((order, index) => [
      index + 1,
      order.productName,
      order.category,
      order.price === 0 ? "Free" : `${order.price} BDT`,
      order.quantity,
      order.date,
      order.status?.toUpperCase() || "PENDING",
    ]);

    autoTable(doc, {
      startY: 55,
      head: [["#", "Product", "Category", "Price", "Qty", "Date", "Status"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [249, 115, 22] },
    });

    doc.save(`PawMart_Orders_${new Date().toISOString().split("T")[0]}.pdf`);
    toast.success("PDF Downloaded! 📄");
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-amber-100 text-amber-600";
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-500">
            Track your adoption requests and purchases
          </p>
        </div>
        {orders.length > 0 && (
          <button
            onClick={downloadPDF}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl shadow-lg hover:bg-gray-800 transition-all cursor-pointer"
          >
            <span>📥</span> Download PDF
          </button>
        )}
      </div>

      {/* Orders */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center">
          <span className="text-6xl mb-4 block">🛒</span>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No Orders Yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start exploring and place your first order
          </p>
          <a
            href="/pets-and-supplies"
            className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white font-semibold rounded-xl"
          >
            <span>🔍</span> Browse Now
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Order Number */}
                <div className="w-12 h-12 bg-linear-to-br from-orange-100 to-rose-100 rounded-xl flex items-center justify-center text-xl font-bold text-orange-500 shrink-0">
                  #{index + 1}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {order.productName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <span>📦</span> {order.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <span>📍</span> {order.address?.slice(0, 30)}...
                    </span>
                    <span className="flex items-center gap-1">
                      <span>📅</span> {order.date}
                    </span>
                  </div>
                </div>

                {/* Price & Quantity */}
                <div className="text-center shrink-0">
                  <p className="text-xl font-bold text-gray-900">
                    {order.price === 0 ? "Free" : `৳${order.price}`}
                  </p>
                  <p className="text-sm text-gray-500">Qty: {order.quantity}</p>
                </div>

                {/* Status */}
                <div className="shrink-0">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status?.toUpperCase() || "PENDING"}
                  </span>
                </div>
              </div>

              {/* Additional Info */}
              {order.additionalNotes && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Notes:</span>{" "}
                    {order.additionalNotes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
