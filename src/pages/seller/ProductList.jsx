// import toast from "react-hot-toast";
// import { useAppContext } from "../../context/appContext";

// const ProductList = () => {
//   const { products, fetchProducts, axios } = useAppContext();

//   const toggleStock = async (id, inStock) => {
//     try {
//       const { data } = await axios.post("/api/product/stock", { id, inStock });
//       if (data.success) {
//         fetchProducts();
//         toast.success(data.message);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.success(error.message);
//     }
//   };
//   return (
//     <div className="flex-1 py-10 flex flex-col justify-between">
//       <div className="w-full md:p-10 p-4">
//         <h2 className="pb-4 text-lg font-medium">All Products</h2>
//         <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
//           <table className="md:table-auto table-fixed w-full overflow-hidden">
//             <thead className="text-gray-900 text-sm text-left">
//               <tr>
//                 <th className="px-4 py-3 font-semibold truncate">Product</th>
//                 <th className="px-4 py-3 font-semibold truncate">Category</th>
//                 <th className="px-4 py-3 font-semibold truncate hidden md:block">
//                   Selling Price
//                 </th>
//                 <th className="px-4 py-3 font-semibold truncate">In Stock</th>
//               </tr>
//             </thead>
//             <tbody className="text-sm text-gray-500">
//               {products.map((product) => (
//                 <tr key={product._id} className="border-t border-gray-500/20">
//                   <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
//                     <div className="border border-gray-300 rounded p-2">
//                       <img
//                         src={`http://localhost:5000/images/${product.image[0]}`}
//                         alt={product.name}
//                         className="w-16"
//                       />
//                     </div>
//                     <span className="truncate max-sm:hidden w-full">
//                       {product.name}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">{product.category}</td>
//                   <td className="px-4 py-3 max-sm:hidden">
//                     ${product.offerPrice}
//                   </td>
//                   <td className="px-4 py-3">
//                     <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
//                       <input
//                         type="checkbox"
//                         className="sr-only peer"
//                         checked={product.inStock} // controlled
//                         onChange={() =>
//                           toggleStock(product._id, !product.inStock)
//                         } // handle change
//                       />

//                       <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
//                       <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
//                     </label>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ProductList;


import toast from "react-hot-toast";
import { useAppContext } from "../../context/appContext";

const ProductList = () => {
  const { products, fetchProducts, axios } = useAppContext();

  // Toggle stock
  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const { data } = await axios.delete(`/api/product/delete/${id}`);
      toast.success(data.message);
      fetchProducts(); // refresh products list
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="flex-1 py-10 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                <th className="px-4 py-3 font-semibold truncate">Action</th> {/* New column */}
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product) => (
                <tr key={product._id} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded p-2">
                      <img
                         src={`http://localhost:5000/images/${product.image[0]}`} // fixed path
                        alt={product.name}
                        className="w-16"
                      />
                    </div>
                    <span className="truncate max-sm:hidden w-full">{product.name}</span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3 max-sm:hidden">${product.offerPrice}</td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={product.inStock}
                        onChange={() => toggleStock(product._id, !product.inStock)}
                      />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
};

export default ProductList;
