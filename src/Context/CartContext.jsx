import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = { token: localStorage.getItem("token") };
  let [cartItems, setcartItems] = useState(0);
  const [favProducts1, setfavProducts1] = useState(0);
  const [cartId, setcartId] = useState("");

  const [IdProduct1, setIdProduct1] = useState(
    localStorage.getItem("favproducts")
      ? localStorage.getItem("favproducts")
      : null
  );

  function addProductToWishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function removeProductFromWishlist(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function loginUserWishList() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => {
        console.log(res.data.count);
        setfavProducts1(res.data.count);
        return res;
      })
      .catch((err) => err);
  }

  function addToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getUserCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((res) => {
        setcartId(res.data.data._id);
        let sum = 0;
        for (const el of res.data.data.products.map(
          (product) => product.count
        )) {
          sum += el;
        }
        setcartItems(sum);
        return res;
      })
      .catch((err) => err);
  }

  function updateCartProduct(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function removeCartProduct(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function clearUserCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  useEffect(() => {
    getUserCart();
    loginUserWishList();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getUserCart,
        updateCartProduct,
        removeCartProduct,
        clearUserCart,
        addProductToWishlist,
        loginUserWishList,
        removeProductFromWishlist,
        favProducts1,
        setfavProducts1,
        IdProduct1,
        setIdProduct1,
        cartItems,
        setcartItems,
        cartId,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
