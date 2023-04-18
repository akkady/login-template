import useAuth from "./useAuth";
import axios from "../api/axios";
import jwtDecode from "jwt-decode";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  const stored_token = sessionStorage.getItem("refresh");

  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      headers: {
        Authorization: "Bearer " + stored_token,
      },
    });
    const acces_token = response?.data?.access_token;
    if (auth.username) {
      setAuth((prev) => {
        return { ...prev, token: acces_token };
      });
    } else {
      const decoded = jwtDecode(acces_token);
      setAuth({
        username: decoded.sub,
        roles: decoded.roles,
        token: acces_token,
      });
    }
    console.log("refreshing token ...");
    return response?.data?.access_token;
  };
  return refresh;
};

export default useRefreshToken;
