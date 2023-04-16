import useAuth from "./useAuth";
import axios from "../api/axios";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  const stored_token = sessionStorage.getItem("refresh");
  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      headers: {
        Authorization: "Bearer " + stored_token,
      },
    });
    setAuth((prev) => {
      return { ...prev, token: response?.data?.access_token };
    });
    return response?.data?.access_token;
  };
  return refresh;
};

export default useRefreshToken;
