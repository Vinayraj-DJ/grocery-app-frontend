// import { useContext, useEffect, useState } from "react";
// import { AppContext, useAppContext } from "../../context/AppContext";
// import { assets, dummyOrders } from "../../assets/assets";
// import toast from "react-hot-toast";

// const Orders = () => {
//   const boxIcon =
//     "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

//   const [orders, setOrders] = useState([]);
//   const { axios } = useContext(AppContext);
//   const fetchOrders = async () => {
//     try {
//       const { data } = await axios.get("/api/order/seller");
//       if (data.success) {
//         setOrders(data.orders);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <div className="md:p-10 p-4 space-y-4">
//       <h2 className="text-lg font-medium">Orders List</h2>
//       {orders.map((order, index) => (
//         <div
//           key={index}
//           className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
//         >
//           <div className="flex gap-5">
//             <img
//               className="w-12 h-12 object-cover opacity-60"
//               src={`http://localhost:5000/images/${order.items[0].product.image[0]}`}
//               alt="boxIcon"
//             />
//             <>
//               {order.items.map((item, index) => (
//                 <div key={index} className="flex flex-col justify-center">
//                   <p className="font-medium">
//                     {item.product.name}{" "}
//                     <span
//                       className={`text-indigo-500 ${
//                         item.quantity < 2 && "hidden"
//                       }`}
//                     >
//                       x {item.quantity}
//                     </span>
//                   </p>
//                 </div>
//               ))}
//             </>
//           </div>

//           <div className="text-sm">
//             <p className="font-medium mb-1">
//               {order.address.firstName} {order.address.lastName}
//             </p>
//             <p>
//               {order.address.street}, {order.address.city},{" "}
//               {order.address.state},{order.address.zipcode},{" "}
//               {order.address.country}
//             </p>
//           </div>

//           <p className="font-medium text-base my-auto text-black/70">
//             ${order.amount}
//           </p>

//           <div className="flex flex-col text-sm">
//             <p>Method: {order.paymentType}</p>
//             <p>Date: {order.orderDate}</p>
//             <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
// export default Orders;


// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const App = () => {
// //   const [products, setProducts] = useState([]);
// //   const [name, setName] = useState("");
// //   const [desc, setDesc] = useState("");

// //   // ✅ Format current date in DD/MM/YYYY
// //   const getCurrentDate = () => {
// //     return new Date().toLocaleDateString("en-GB", {
// //       day: "2-digit",
// //       month: "2-digit",
// //       year: "numeric",
// //     });
// //   };

// //   // ✅ Fetch products from backend
// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:5001/products")
// //       .then((res) => {
// //         setProducts(res.data);
// //       })
// //       .catch((err) => console.error(err));
// //   }, []);

// //   // ✅ Add new product
// //   const addProduct = () => {
// //     const newProduct = {
// //       name,
// //       description: desc,
// //       date: getCurrentDate(), // always save date as DD/MM/YYYY
// //     };

// //     axios
// //       .post("http://localhost:5001/products", newProduct)
// //       .then((res) => {
// //         setProducts([...products, res.data]);
// //         setName("");
// //         setDesc("");
// //       })
// //       .catch((err) => console.error(err));
// //   };

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h2>📦 Product List</h2>

// //       <div style={{ marginBottom: "20px" }}>
// //         <input
// //           type="text"
// //           placeholder="Product Name"
// //           value={name}
// //           onChange={(e) => setName(e.target.value)}
// //           style={{ marginRight: "10px" }}
// //         />
// //         <input
// //           type="text"
// //           placeholder="Description"
// //           value={desc}
// //           onChange={(e) => setDesc(e.target.value)}
// //           style={{ marginRight: "10px" }}
// //         />
// //         <button onClick={addProduct}>Add Product</button>
// //       </div>

// //       <ul>
// //         {products.map((p, index) => (
// //           <li key={index}>
// //             <b>{p.name}</b> - {p.description} <br />
// //             📅{" "}
// //             {p.date
// //               ? new Date(p.date).toLocaleDateString("en-GB") // ✅ show saved date
// //               : getCurrentDate() // ✅ fallback for old products
// //             }
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default App;

// import { useContext, useEffect, useState } from "react";
// import { AppContext } from "../../context/appContext";
// // import{assets,dummyOrders} from "../../assets/assets";
// import toast from "react-hot-toast";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const { axios } = useContext(AppContext);

//   // Fetch orders from backend
//   const fetchOrders = async () => {
//     try {
//       const { data } = await axios.get("/api/order/seller");
//       if (data.success) {
//         setOrders(data.orders);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // Format date as DD/MM/YYYY
//   const formatDate = (dateString) => {
//     let date;
//     if (dateString) {
//       date = new Date(dateString);
//     } else {
//       date = new Date();
//     }
//     if (isNaN(date.getTime())) date = new Date();
//     return date.toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//   };

//   return (
//     <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
//       <h2 style={{ fontSize: "20px", fontWeight: "600" }}>Orders List</h2>
//       {orders.length === 0 && <p>No orders found.</p>}
//       {orders.map((order, index) => (
//         <div
//           key={index}
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "15px",
//             padding: "15px",
//             maxWidth: "900px",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//             color: "#333",
//           }}
//         >
//           {/* Product Info */}
//           <div style={{ display: "flex", gap: "15px" }}>
//             <img
//               src={`http://localhost:5000/images/${order.items[0].product.image[0]}`}
//               alt="product"
//               style={{ width: "48px", height: "48px", objectFit: "cover", opacity: 0.6 }}
//             />
//             <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
//               {order.items.map((item, i) => (
//                 <p key={i} style={{ fontWeight: "500" }}>
//                   {item.product.name}{" "}
//                   <span style={{ color: "#6366f1", display: item.quantity < 2 ? "none" : "inline" }}>
//                     x {item.quantity}
//                   </span>
//                 </p>
//               ))}
//             </div>
//           </div>

//           {/* Customer Address */}
//           <div style={{ fontSize: "14px" }}>
//             <p style={{ fontWeight: "500", marginBottom: "5px" }}>
//               {order.address.firstName} {order.address.lastName}
//             </p>
//             <p>
//               {order.address.street}, {order.address.city}, {order.address.state},{" "}
//               {order.address.zipcode}, {order.address.country}
//             </p>
//           </div>

//           {/* Amount */}
//           <p style={{ fontWeight: "500", fontSize: "16px", color: "#555" }}>${order.amount}</p>

//           {/* Payment Info */}
//           <div style={{ display: "flex", flexDirection: "column", fontSize: "14px" }}>
//             <p>Method: {order.paymentType}</p>
//             <p>Date: {formatDate(order.orderDate)}</p>
//             <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Orders;


import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { axios } = useContext(AppContext);

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Format date as DD/MM/YYYY
  const formatDate = (dateString) => {
    let date = dateString ? new Date(dateString) : new Date();
    if (isNaN(date.getTime())) date = new Date();
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Cancel order
  const cancelOrder = async (orderId) => {
    try {
      const { data } = await axios.patch(`/api/order/cancel/${orderId}`);
      if (data.success) {
        toast.success("Order cancelled successfully!");
        fetchOrders(); // refresh the order list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "600" }}>Orders List</h2>
      {orders.length === 0 && <p>No orders found.</p>}
      {orders.map((order, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            padding: "15px",
            maxWidth: "900px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            color: "#333",
          }}
        >
          {/* Product Info */}
          <div style={{ display: "flex", gap: "15px" }}>
            <img
              src={
                order.items[0]?.product?.image?.length > 0
                  ? `http://localhost:5000/images/${order.items[0].product.image[0]}`
                  : "/default.png"
              }
              alt={order.items[0]?.product?.name || "Product"}
              style={{ width: "48px", height: "48px", objectFit: "cover", opacity: 0.6 }}
            />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              {order.items.map((item, i) => (
                <p key={i} style={{ fontWeight: "500" }}>
                  {item.product?.name || "Product Name"}{" "}
                  <span style={{ color: "#6366f1", display: item.quantity < 2 ? "none" : "inline" }}>
                    x {item.quantity}
                  </span>
                </p>
              ))}
            </div>
          </div>

          {/* Customer Address */}
          <div style={{ fontSize: "14px" }}>
            <p style={{ fontWeight: "500", marginBottom: "5px" }}>
              {order.address?.firstName || "-"} {order.address?.lastName || "-"}
            </p>
            <p>
              {order.address?.street || "-"}, {order.address?.city || "-"}, {order.address?.state || "-"},{" "}
              {order.address?.zipcode || "-"}, {order.address?.country || "-"}
            </p>
          </div>

          {/* Amount */}
          <p style={{ fontWeight: "500", fontSize: "16px", color: "#555" }}>${order.amount || 0}</p>

          {/* Payment Info */}
          <div style={{ display: "flex", flexDirection: "column", fontSize: "14px" }}>
            <p>Method: {order.paymentType || "N/A"}</p>
            <p>Date: {formatDate(order.createdAt)}</p>
            <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            <p>Status: {order.status || "Processing"}</p>
          </div>

          {/* Cancel Order Button */}
          {order.status !== "Cancelled" && (
            <button
              onClick={() => cancelOrder(order._id)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                backgroundColor: "#ef4444",
                color: "#fff",
                borderRadius: "6px",
                fontWeight: "500",
                cursor: "pointer",
                border: "none",
              }}
            >
              Cancel Order
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Orders;

