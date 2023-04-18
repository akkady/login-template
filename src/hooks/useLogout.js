import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = () => {
    sessionStorage.removeItem("refresh");
    setAuth({});
  };
  return logout;
};

export default useLogout;
