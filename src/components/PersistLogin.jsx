import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState, useEffect, useRef } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useLocalstorage from "../hooks/useLocalstorage";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const [persist] = useLocalstorage("persist", false);
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.token && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
