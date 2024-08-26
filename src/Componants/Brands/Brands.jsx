import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "flowbite-react";

export default function Brands() {
  const [openModal, setOpenModal] = useState(false);
  let headers = { token: localStorage.getItem("token") };
  const [catProducts, setcatProducts] = useState([]);
  const [spBrand, setspBrand] = useState({});
  const [IsLoding, setIsLoding] = useState(false);
  const [proid, setproid] = useState("");

  function getAllBrands() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }
  async function wayTogetAllBrands() {
    let res = await getAllBrands();
    console.log(res.data.data);
    setcatProducts(res.data.data);
  }

  function getspecificbrand(id) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  async function waygetspecificbrand(id) {
    setproid(id);
    setIsLoding(true);
    let res = await getspecificbrand(id);
    setIsLoding(false);
    console.log(res.data.data);
    setspBrand(res.data.data);
  }

  useEffect(() => {
    wayTogetAllBrands();
  }, []);

  return (
    <>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Brand Information</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <img
              className="mx-auto rounded-t-lg w-[350px] h-[350px] object-contain"
              src={spBrand.image}
            />
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {spBrand.name}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
      {catProducts.length > 0 ? (
        <div className="py-36 md:py-24">
          <h1 className="text-5xl font-bold text-center text-[#5ac624]">
            All Brands
          </h1>
          <div className="row justify-center pt-5 ">
            {catProducts?.map((product) => (
              <div
                onClick={async () => {
                  await waygetspecificbrand(product._id);
                  setOpenModal(true);
                }}
                key={product._id}
                className="col w-6/6 sm:w-1/2 md:w-2/6  my-3 p-5 relative"
              >
                <div className="max-w-sm cursor-pointer bg-white border border-gray-200 rounded-lg hover:shadow-lg duration-500 hover:shadow-green-900 shadow dark:bg-gray-800 dark:border-gray-700">
                  <div>
                    <img
                      className="rounded-t-lg w-[350px] h-[350px] object-contain"
                      src={product.image}
                    />
                  </div>
                  <div className="p-5">
                    <div>
                      <Button className="button-53" role="button">
                        {IsLoding && proid == product._id ? (
                          <i className="fa-solid fa-spinner fa-spin"></i>
                        ) : (
                          product.name
                        )}
                      </Button>
                    </div>

                    {/* <div   className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-center ">
          <div className="preloader">
            <svg
              className="cart"
              role="img"
              aria-label="Shopping cart line animation"
              viewBox="0 0 128 128"
              width="128px"
              height="128px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={8}
              >
                <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
                  <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                  <circle cx={43} cy={111} r={13} />
                  <circle cx={102} cy={111} r={13} />
                </g>
                <g className="cart__lines" stroke="currentColor">
                  <polyline
                    className="cart__top"
                    points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                    strokeDasharray="338 338"
                    strokeDashoffset={-338}
                  />
                  <g className="cart__wheel1" transform="rotate(-90,43,111)">
                    <circle
                      className="cart__wheel-stroke"
                      cx={43}
                      cy={111}
                      r={13}
                      strokeDasharray="81.68 81.68"
                      strokeDashoffset="81.68"
                    />
                  </g>
                  <g className="cart__wheel2" transform="rotate(90,102,111)">
                    <circle
                      className="cart__wheel-stroke"
                      cx={102}
                      cy={111}
                      r={13}
                      strokeDasharray="81.68 81.68"
                      strokeDashoffset="81.68"
                    />
                  </g>
                </g>
              </g>
            </svg>
            <div className="preloader__text">
              <p className="preloader__msg">Bringing you the goods…</p>
              <p className="preloader__msg preloader__msg--last font-bold text-2xl">
                Empty Cart
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
