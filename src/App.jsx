import {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Login from "./components/Login";
import { NoMatch } from "./components/NoMatch";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [loged,setLoged] = useState(false);
  return (
    <UserContext.Provider value={{setLoged}}>
      <BrowserRouter>
        <Routes>
          {loged ? (
            <>
              <Route path="/" element={<Home />}>
                {/* <Route index element={<Home />} /> */}
                <Route path="about" element={<About />} />
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
              <Route path="*" element={<NoMatch />} />
            </>
          ) : (
            <>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<Login />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;