import axios from "axios";
import { createContext } from "react";

export let CheckoutContext = createContext();

export default function CheckoutContextProvider(props) {
  let headers = { token: localStorage.getItem("token") };

  function updateCartProduct(cartId, url, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  return (
    <CheckoutContext.Provider value={{ updateCartProduct }}>
      {props.children}
    </CheckoutContext.Provider>
  );
}
