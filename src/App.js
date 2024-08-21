import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from "./pages/Home"
import { SignIn } from "./pages/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="signIn" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
