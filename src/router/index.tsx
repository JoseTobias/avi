import React from "react";

import Chat from "../pages/Chat";
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
          path="/:nick/config"
          element={
            <RequireAuth>
              <Config />
            </RequireAuth>
          }
        />
        <Route
          path="/:nick/chat"
          element={
            <RequireAuth>
              <Chat />
            </RequireAuth>
          }
        />
        {/* <Route
            path="/config"
            element={
              <RequireAuth>
                <Config />
              </RequireAuth>
            }
          />

          <Route
            path="/chat"
            element={
              <RequireAuth>
                <Config />
              </RequireAuth>
            }
          />
        </Route> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default appRoutes;
