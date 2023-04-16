import axios from "./axios";
const UserService = {
  login: (data) =>
    axios.post("/auth/login", JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    }),
  register: (data) =>
    axios.post("/auth/register", data, {
      headers: { "Content-Type": "application/json" },
    }),
  getUsers: (token) =>
    axios.get("/users", {
      headers: { Authorization: "Bearer " + token },
    }),
};
export default UserService;
