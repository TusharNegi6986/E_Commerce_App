import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;

  // ✅ SAFE backend URL (IMPORTANT FIX)
  const backendUrl =
     import.meta.env.VITE_BACKEND_URL ||
  "https://e-commerce-app-backend-topaz.vercel.app";

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  // ================= ADD TO CART =================
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    setCartItems(cartData);

    if (!token) return;

    try {
      await axios.post(
        `${backendUrl}/api/cart/add`,
        { itemId, size },
        { headers: { token } }
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to cart");
    }
  };

  // ================= CART COUNT =================
  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const qty = cartItems[itemId][size];
        if (qty > 0) totalCount += qty;
      }
    }

    return totalCount;
  };

  // ================= UPDATE QUANTITY =================
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (!token) return;

    try {
      await axios.post(
        `${backendUrl}/api/cart/update`,
        { itemId, size, quantity },
        { headers: { token } }
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to update cart");
    }
  };

  // ================= CART AMOUNT =================
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;

      for (const size in cartItems[itemId]) {
        const qty = cartItems[itemId][size];
        if (qty > 0) {
          totalAmount += product.price * qty;
        }
      }
    }

    return totalAmount;
  };

  // ================= GET PRODUCTS =================
  const getProductsData = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/list`
      );

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    }
  };

  // ================= GET CART =================
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load cart");
    }
  };

  // ================= EFFECTS =================
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
      getUserCart(savedToken);
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;