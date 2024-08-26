import { createContext, useState } from "react";

export let UserLogin = createContext();

export default function UserLoginProvider(props) {
  const [userLogin, setuserLogin] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );

  //   useEffect(() => {
  //     if (localStorage.getItem("token")) {
  //       setuserLogin(localStorage.getItem("token"));
  //     }
  //   }, []);

  return (
    <UserLogin.Provider value={{ userLogin, setuserLogin }}>
      {props.children}
    </UserLogin.Provider>
  );
}
