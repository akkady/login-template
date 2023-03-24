import { createContext } from "react";

export const UserContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      setLoged(
        contacts.filter(action.payload.email)[0].password ===
          action.payload.password
      );
    default:
      return state;
  }
};

export const contacts = [
  {
    id: 1,
    name: "MOhamed Amine",
    tel: "025885225",
    email: "aminehajjojuji54@gmail.com",
    password: "1234",
  },
  { id: 2, name: "younes", tel: "063589741", email: "younes@gmail.com" },
  {
    id: 3,
    name: "zakaria",
    tel: "07521586228",
    email: "zakaria@gmail.com",
    password: "1234",
  },
];
