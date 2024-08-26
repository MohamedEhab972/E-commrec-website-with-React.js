// import React, { useContext, useState } from "react";
// import toast from "react-hot-toast";
// import { CartContext } from "../Context/CartContext";

// export default function useAddtoCart() {
//   let { addToCart } = useContext(CartContext);
//   const [spinner, setspinner] = useState(false);
//   const [IdProduct, setIdProduct] = useState("");

//   async function wayAddToCart(id) {
//     setIdProduct(id);
//     setspinner(true);
//     let res = await addToCart(id);
//     console.log(res);
//     if (res.data.status == "success") {
//       setspinner(false);
//       toast.success(res.data.message);
//     } else {
//       toast.error(res.data.message);
//     }
//   }
//   return wayAddToCart(id);
// }
