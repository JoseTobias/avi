import React from "react";

import Layout from "../Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const appRoutes: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default appRoutes;
