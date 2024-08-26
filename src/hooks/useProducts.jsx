import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useProducts() {
  function getProductes() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let myProducts = useQuery({
    queryKey: ["RecentProduct"],
    queryFn: getProductes,
    staleTime: Infinity,
    select: (data) => data.data.data,
    // gcTime: 4000,
    // retry:7, //defulte 3 tries
    // retryDelay:2000
    // refetchInterval: 5000,
    // refetchIntervalInBackground: true, //يفضل شغال حتى لو رحت في تابة تانية
    // refetchOnWindowFocus: true,
  });

  return myProducts;
}
