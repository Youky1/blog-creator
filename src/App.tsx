import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";

import Index from "./pages/Index";
import Create from "./pages/Create";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<Index />} />
          <Route path="create" element={<Create />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
