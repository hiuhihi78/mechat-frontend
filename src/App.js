import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';

import ContextContainer from '~/contexts/ContextContainer'
import { Home } from "./pages/Home"
import { SignIn } from "./pages/SignIn";
import { InterceptorContainer } from "./interceptors/InterceptorContainer";
import Routing from "./routes/Routing";


const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

function App() {

  useEffect(() => {
    console.log('render')
  })

  return (
    <AuthProvider store={store}>
      <ContextContainer>
        <InterceptorContainer>
          <Routing>
          </Routing>
        </InterceptorContainer>
      </ContextContainer>
    </AuthProvider>
  );
}

export default App;
