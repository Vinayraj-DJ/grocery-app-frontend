// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import{dummyProducts} from "../assets/assets"
// import toast from "react-hot-toast";
// import axios from "axios";
// // import axios from "../utils/api"; // ✅ now imported cleanly
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000" ;
// //eslint-disable-next-line react-refresh/only-export-components
// export const AppContext = createContext(null);

// export const AppContextProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [isSeller, setIsSeller] = useState(false);
//   const [showUserLogin, setShowUserLogin] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");

//   // check seller status
//   const fetchSeller = async () => {
//     try {
//       const { data } = await axios.get("/api/seller/is-auth");
//       if (data.success) {
//         setIsSeller(true);
//       } else {
//         setIsSeller(false);
//       }
//     } catch (error) {
//       console.log(error);
//       setIsSeller(false);
//     }
//   };

//   // fetch user auth status ,user Data and cart items
//   const fetchUser = async () => {
//     try {
//       const { data } = await axios.get("/api/user/is-auth");
//       if (data.success) {
//         setUser(data.user);
//         setCartItems(data.user.cart);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // fetch products
//   const fetchProducts = async () => {
//     try {
//       const { data } = await axios.get("/api/product/list");
//       if (data.success) {
//         setProducts(data.products);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
//   // add product to cart
//   const addToCart = (itemId) => {
//     let cartData = structuredClone(cartItems || {}); // safeguard for undefined

//     if (cartData[itemId]) {
//       cartData[itemId] += 1;
//     } else {
//       cartData[itemId] = 1;
//     }

//     setCartItems(cartData);
//     toast.success("Added to cart");
//   };

//   // update cart item quantity
//   const updateCartItem = (itemId, quantity) => {
//     let cartData = structuredClone(cartItems);
//     cartData[itemId] = quantity;
//     setCartItems(cartData);
//     toast.success(`cart updated`);
//   };

//   // total cart items
//   const cartCount = () => {
//     let totalCount = 0;
//     for (const item in cartItems) {
//       totalCount += cartItems[item];
//     }
//     return totalCount;
//   };
//   // total cart amount
//   const totalCartAmount = () => {
//     let totalAmount = 0;
//     for (const items in cartItems) {
//       let itemInfo = products.find((product) => product._id === items);
//       if (cartItems[items] > 0) {
//         totalAmount += cartItems[items] * itemInfo.offerPrice;
//       }
//     }
//     return Math.floor(totalAmount * 100) / 100;
//   };
//   // remove product from cart
//   const removeFromCart = (itemId) => {
//     let cartData = structuredClone(cartItems);
//     if (cartData[itemId]) {
//       cartData[itemId] -= 1;
//       if (cartData[itemId] === 0) {
//         delete cartData[itemId];
//       }
//       toast.success(`remove from cart`);
//       setCartItems(cartData);
//     }
//   };
//   useEffect(() => {
//     fetchSeller();
//     fetchProducts();
//     fetchUser();
//   }, []);

//   // update database cart items
//   useEffect(() => {
//     const updateCart = async () => {
//       try {
//         const { data } = await axios.post("/api/cart/update", { cartItems });

//         if (!data.success) {
//           toast.error(data.message);
//         }
//       } catch (error) {
//         toast.error(error.message);
//       }
//     };

//     if (user) {
//       updateCart();
//     }
//   }, [cartItems]);

//   const value = {
//     navigate,
//     user,
//     setUser,
//     isSeller,
//     setIsSeller,
//     showUserLogin,
//     setShowUserLogin,
//     products,
//     cartItems,
//     addToCart,
//     updateCartItem,
//     removeFromCart,
//     searchQuery,
//     setSearchQuery,
//     cartCount,
//     totalCartAmount,
//     axios,
//     fetchProducts,
//     setCartItems,
//   };
//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };


// export const useAppContext = () => {
//   return useContext(AppContext);
// };



// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { dummyProducts } from "../assets/assets";
// import toast from "react-hot-toast";
// import axios from "axios";

// // Set Axios defaults
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL =
//   import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// // Create context
// export const AppContext = createContext(null);

// export const AppContextProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [isSeller, setIsSeller] = useState(false);
//   const [showUserLogin, setShowUserLogin] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");

//   // -----------------------------
//   // API Calls
//   // -----------------------------
//   const fetchSeller = async () => {
//     try {
//       const { data } = await axios.get("/api/seller/is-auth");
//       setIsSeller(data.success ? true : false);
//     } catch (error) {
//       console.log(error);
//       setIsSeller(false);
//     }
//   };

//   const fetchUser = async () => {
//     try {
//       const { data } = await axios.get("/api/user/is-auth");
//       if (data.success) {
//         setUser(data.user);
//         setCartItems(data.user.cart || {});
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const { data } = await axios.get("/api/product/list");
//       if (data.success) {
//         setProducts(data.products);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const loginUser = async (email, password) => {
//     try {
//       const { data } = await axios.post(
//         "/api/user/login",
//         { email, password },
//         { withCredentials: true }
//       );
//       if (data.success) {
//         setUser(data.user);
//         setCartItems(data.user.cart);
//         toast.success("Logged in successfully!");
//       } else {
//         toast.error(data.message);
//       }
//       return data;
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//       return null;
//     }
//   };

//   const logoutUser = async () => {
//     try {
//       const { data } = await axios.get("/api/user/logout");
//       if (data.success) {
//         setUser(null);
//         setCartItems({});
//         toast.success("Logged out successfully!");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // -----------------------------
//   // Cart operations
//   // -----------------------------
//   const addToCart = (itemId) => {
//     const cartData = structuredClone(cartItems || {});
//     cartData[itemId] = (cartData[itemId] || 0) + 1;
//     setCartItems(cartData);
//     toast.success("Added to cart");
//   };

//   const updateCartItem = (itemId, quantity) => {
//     const cartData = structuredClone(cartItems);
//     cartData[itemId] = quantity;
//     setCartItems(cartData);
//     toast.success("Cart updated");
//   };

//   const removeFromCart = (itemId) => {
//     const cartData = structuredClone(cartItems);
//     if (cartData[itemId]) {
//       cartData[itemId] -= 1;
//       if (cartData[itemId] === 0) delete cartData[itemId];
//       setCartItems(cartData);
//       toast.success("Removed from cart");
//     }
//   };

//   const cartCount = () => Object.values(cartItems).reduce((a, b) => a + b, 0);

//   const totalCartAmount = () => {
//     let total = 0;
//     for (const itemId in cartItems) {
//       const product = products.find((p) => p._id === itemId);
//       if (product && cartItems[itemId] > 0) {
//         total += cartItems[itemId] * product.offerPrice;
//       }
//     }
//     return Math.floor(total * 100) / 100;
//   };

//   // -----------------------------
//   // Update cart in DB
//   // -----------------------------
//   useEffect(() => {
//     const updateCart = async () => {
//       if (!user) return;
//       try {
//         const { data } = await axios.post("/api/cart/update", { cartItems });
//         if (!data.success) toast.error(data.message);
//       } catch (error) {
//         toast.error(error.message);
//       }
//     };
//     updateCart();
//   }, [cartItems, user]);

//   // -----------------------------
//   // Initial fetch
//   // -----------------------------
//   useEffect(() => {
//     fetchSeller();
//     fetchProducts();
//     fetchUser();
//   }, []);

//   const value = {
//     navigate,
//     user,
//     setUser,
//     isSeller,
//     setIsSeller,
//     showUserLogin,
//     setShowUserLogin,
//     products,
//     cartItems,
//     addToCart,
//     updateCartItem,
//     removeFromCart,
//     searchQuery,
//     setSearchQuery,
//     cartCount,
//     totalCartAmount,
//     loginUser,
//     logoutUser,
//     fetchProducts,
//     setCartItems,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => useContext(AppContext);


import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

// ✅ Setup axios globally
axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

//eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Utility for showing errors consistently
  const handleError = (error) => {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message || "Something went wrong");
    }
  };

  // check seller status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success);
    } catch (error) {
      console.error(error);
      setIsSeller(false);
    }
  };

  // fetch user auth status ,user Data and cart items
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user?.cart || {});
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  // fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  // add product to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems || {});

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    toast.success("Added to cart");
  };

  // update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated");
  };

  // total cart items
  const cartCount = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  // total cart amount
  const totalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const itemInfo = products.find((p) => p._id === id);
      if (itemInfo && qty > 0) {
        total += qty * itemInfo.offerPrice;
      }
      return total;
    }, 0);
  };

  // remove product from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
      toast.success("Removed from cart");
      setCartItems(cartData);
    }
  };

  useEffect(() => {
    fetchSeller();
    fetchProducts();
    fetchUser();
  }, []);

  // update database cart items
  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });
        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        handleError(error);
      }
    };

    if (user) {
      updateCart();
    }
  }, [cartItems]);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    cartCount,
    totalCartAmount,
    axios,
    fetchProducts,
    setCartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
