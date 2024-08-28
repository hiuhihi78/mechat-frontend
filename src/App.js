import React from "react";
import { AuthProvider } from 'react-auth-kit';

import ContextContainer from '~/contexts/ContextContainer'
import { InterceptorContainer } from "./interceptors/InterceptorContainer";
import Routing from "./routes/Routing";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

function App() {

  return (
    <AuthProvider
      authType={'cookie'}
      authName={'_auth'}
      //refresh={refreshToken}
      cookieDomain={window.location.hostname}
    >
      <GoogleOAuthProvider
        clientId={GOOGLE_CLIENT_ID}
      >
        <ContextContainer>
          <InterceptorContainer>
            <Routing>
            </Routing>
          </InterceptorContainer>
        </ContextContainer>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
