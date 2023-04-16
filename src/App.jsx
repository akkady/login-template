import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Login from "./components/Login";
import NoMatch from "./components/NoMatch";
import Register from "./components/Register";
import RequireAuth, { ROLES } from "./utils/RequireAuth";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="unauthorized" element={<Register />} />
      <Route path="*" element={<NoMatch />} />
      {/* private routes */}
      <Route element={<RequireAuth allowedRoles={[ROLES.user, ROLES.admin]} />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Route>
      {/* invalid routes */}
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
