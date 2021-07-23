import "../styles/globals.scss";
import { User } from "../context/UserContext";
import { useEffect, useState } from "react";
import Redirect from "../components/Redirect";

function MyApp({ Component, pageProps }) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(sessionStorage.getItem("user") ? true : false);
  }, []);

  return (
    <User.Provider value={{ isAuth, setIsAuth }}>
      <Component {...pageProps} />
    </User.Provider>
  );
}

export default MyApp;
