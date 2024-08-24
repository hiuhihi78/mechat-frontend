import React, { useEffect } from "react";
import { AuthProvider } from 'react-auth-kit';

import ContextContainer from '~/contexts/ContextContainer'
import { InterceptorContainer } from "./interceptors/InterceptorContainer";
import Routing from "./routes/Routing";



function App() {

  return (
    <AuthProvider
      authType={'cookie'}
      authName={'_auth'}
      //refresh={refreshToken}
      cookieDomain={window.location.hostname}
      cookieSecure
    >
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
