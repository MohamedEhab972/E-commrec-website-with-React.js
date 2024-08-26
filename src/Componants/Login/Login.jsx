import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserLogin } from "../../Context/UserLogin";

export default function Login() {
  let { setuserLogin } = useContext(UserLogin);
  const [apiError, setApiError] = useState("");
  const [spinner, setspinner] = useState(false);
  const [btndisabled, setbtndisabled] = useState(null);

  let navegate = useNavigate();

  function handelSubmit(paramter) {
    setspinner(true);
    setbtndisabled("disabled");
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", paramter)
      .then((res) => {
        setspinner(false);
        setbtndisabled(null);
        if (res.data.message == "success") {
          localStorage.setItem("token", res.data.token);
          setuserLogin(res.data.token);
          navegate("/");
        }
      })
      .catch((res) => {
        setspinner(false);
        setbtndisabled(null);
        setApiError(res.response.data.message);
      });
  }

  let validationSchema = yup.object().shape({
    email: yup.string().email("invaled Email").required("email is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@$!#%*?&]{8,}$/,
        "Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      )
      .required("password is required"),
  });

  //custome valedation
  // function handelValidate(params) {
  //   let errors = {};

  //   if (!params.name) {
  //     errors.name = "the name is required";
  //   } else if (!/^[A-Z][a-z]{3}$/.test(params.name)) {
  //     errors.name = "enter valed name [A-Z][a-z]{4}";
  //   }
  //   if (!params.phone) {
  //     errors.phone = "the phone is required";
  //   } else if (!/^01[0125][0-9]{8}$/.test(params.phone)) {
  //     errors.phone = "enter valed phone 01[0125][0-9]{8}";
  //   }
  //   return errors;
  // }
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    // validate: handelValidate,
    onSubmit: handelSubmit,
  });
  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <form onSubmit={formik.handleSubmit} className="w-3/4 md:w-1/2 ">
          <h2 className="font-bold text-4xl text-center mb-5 text-emerald-600">
            Login Now
          </h2>
          {apiError ? (
            <h2 className="p-3 my-2 text-center font-semibold bg-red-600 text-white rounded-md">
              {apiError}
            </h2>
          ) : null}
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              type="email"
              id="email"
              className="my-8 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Email
            </label>
            {formik.errors.email && formik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">{formik.errors.email}</span>
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              type="password"
              id="password"
              className="mt-8 mb-3 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your password
            </label>
            {formik.errors.password && formik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">{formik.errors.password}</span>
              </div>
            ) : null}
          </div>
          <div className="mb-6">
            <Link
              className="text-blue-600 underline mb-10"
              to={"/forgetPassword"}
            >
              Forget Passwprd
            </Link>
          </div>

          <div className="flex gap-5 items-center">
            {btndisabled != null ? (
              <button
                disabled
                type="submit"
                className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
              >
                {spinner == true ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  "Login"
                )}
              </button>
            ) : (
              <button
                type="submit"
                className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
              >
                {spinner == true ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  "Login"
                )}
              </button>
            )}
            <Link className="text-blue-600" to={"/register"}>
              if you donot have Account please Click here ?{" "}
              <span className="underline">Register</span>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
