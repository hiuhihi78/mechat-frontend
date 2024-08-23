import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from "./pages/Home"
import { SignIn } from "./pages/SignIn";

import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

function App() {

  return (
    <AuthProvider store={store}>
      <Router>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="signIn" element={<SignIn />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
