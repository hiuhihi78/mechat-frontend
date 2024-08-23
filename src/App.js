import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';

import ContextContainer from '~/contexts/ContextContainer'
import { Home } from "./pages/Home"
import { SignIn } from "./pages/SignIn";
import { InterceptorContainer } from "./interceptors/InterceptorContainer";


const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

function App() {

  return (
    <AuthProvider store={store}>
      <ContextContainer>
        <InterceptorContainer>
          <Router>
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="signIn" element={<SignIn />} />
            </Routes>
          </Router>
        </InterceptorContainer>
      </ContextContainer>
    </AuthProvider>
  );
}

export default App;
