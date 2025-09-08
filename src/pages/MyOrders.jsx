import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext"; // make sure the file path is correct
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useContext(AppContext);

  // Fetch orders for logged-in user
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Color-coded status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      case "Delivered":
        return "bg-green-200 text-green-800";
      case "Cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="mt-12 pb-16 px-4 md:px-0 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>

      {myOrders.length === 0 ? (
        <p className="mt-6 text-gray-600 text-lg">No orders placed yet.</p>
      ) : (
        myOrders.map((order, orderIndex) => (
          <div
            key={orderIndex}
            className="my-6 border border-gray-300 rounded-lg p-4 md:p-6 shadow-sm bg-white"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div className="space-y-1">
                <p>
                  <span className="font-semibold">Order ID:</span> {order._id}
                </p>
                <p>
                  <span className="font-semibold">Payment:</span> {order.paymentType || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Total Amount:</span> ${order.amount || 0}
                </p>
                <p>
                  <span className="font-semibold">Items:</span> {order.items.length}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center border p-2 rounded-md"
                >
                  <img
                    src={
                      item.product?.image?.length > 0
                        ? `http://localhost:5000/images/${item.product.image[0]}`
                        : "/default.png"
                    }
                    alt={item.product?.name || "Product"}
                    className="w-20 h-20 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <h2 className="font-medium">{item.product?.name || "Product Name"}</h2>
                    <p className="text-gray-500">{item.product?.category || "-"}</p>
                    <p className="mt-1">Quantity: {item.quantity || 1}</p>
                    <p className="mt-1 font-semibold">
                      Amount: $
                      {item.product?.offerPrice ? item.product.offerPrice * item.quantity : 0}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
