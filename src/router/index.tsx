import React from "react";

import Config from "../pages/Config";
import DashBoard from "../pages/DashBoard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RequireAuth from "./RequireAuth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const appRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <DashBoard />
            </RequireAuth>
          }
        />
        <Route
          path="/config/:nick"
          element={
            <RequireAuth>
              <Config />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default appRoutes;
